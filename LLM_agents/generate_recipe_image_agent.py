import requests
import together
import base64
from typing import List
from uagents import Agent, Context, Model, Protocol

class ImageRequestSchema(Model):
    recipe_list: list

class ImageResponseSchema(Model):
    image_list: List[str]

async def generate_image(recipe_name):
    together.api_key = "d46fcb020e7ca37543c27e7c9f4e6521e0f5a5d7939a336de7e5d728077ca60e"

    # generate image 
    response = together.Image.create(prompt= recipe_name, 
                                     model = 'stabilityai/stable-diffusion-xl-base-1.0', 
                                     steps = 50, height = 512, width = 512)

    # save the first image
    image = response["output"]["choices"][0]
    image_base64 = image["image_base64"]
    print(image_base64)
    return image_base64


image_proto = Protocol("GenerateImage")
agent = Agent(
    name="recipe_image",
    seed="generate recipe image",
    port=8002,
    endpoint="http://localhost:8002/submit",
)

# @image_proto.on_message(model=ImageRequestSchema, replies={ImageResponseSchema})
@agent.on_query(model=ImageRequestSchema, replies={ImageResponseSchema})
async def handle_image_request(ctx: Context, sender: str, _query: ImageRequestSchema):
    # bookings = ctx.storage.get("bookings") or {}
    print(_query.recipe_list)
    ctx.logger.info(f"Generating image for {_query.recipe_list}")
    # success = book_table(msg.table_number, sender, bookings)

    # IMAGE API CALL
    all_images = []
    for recipe_name in _query.recipe_list:
        image_base64 = await generate_image(recipe_name)
        all_images.append(image_base64)
    
    success = True
    if success:
        print(len(all_images))
        ctx.logger.info(f"Image for recipe: {_query.recipe_list} generated successfully.")
    else:
        print(len(all_images))
        ctx.logger.info(f"Image for {_query.recipe_list} generation unsuccesful.")
    await ctx.send(sender, ImageResponseSchema(image_list=all_images))
    # print("returning the output")

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {agent.name}")
    ctx.logger.info(f"With address: {agent.address}")
    ctx.logger.info(f"And wallet address: {agent.wallet.address()}")

agent.include(image_proto, publish_manifest=True)

if __name__ == "__main__":
    agent.run()

    


    