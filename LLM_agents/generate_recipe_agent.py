import json
from typing import List
import requests
from uagents import Agent, Context, Model
from uagents.query import query

GENERATE_RECIPE_IMAGE_AGENT = "agent1qt6luu5l9a8dv8s5hchuecasn40p93aaz85c4n2dcw344nxsxp3mc247kmt"

class RequestSchema(Model):
    message: str

class ResponseSchema(Model):
    image_list: list

class ImageRequestSchema(Model):
    recipe_list: list

class ImageResponseSchema(Model):
    image_list: List[str]

async def get_illness(medicine):
    url = "https://api.together.xyz/inference"

    payload = {
        "model": "meta-llama/Llama-2-70b-chat-hf",
        "prompt": 
        '''
        <s>
        <<SYS>>
        You are a knowledgeable assistant with a focus on pharmacology and medicine. Your task is to provide information on what illness a specific drug is used to treat. When given the name of a drug, respond only with the name of the illness or condition it is used to treat. Do not include any additional information or commentary. If given the name of an illness or condition, respond by repeating the name of the illness or condition. Follow these instructions precisely.
        <</SYS>>
        
        [INST]Acetaminophen[/INST]Pain, fever
        [INST]Metformin[/INST]Type 2 diabetes
        [INST]Asthma[/INST]Asthma</s>
        <s>
        [INST]'''+medicine+'''[/INST]
        ''',
        "max_tokens": 100,
        "stop": ["</s>", "[/INST]"],
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "n": 1
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "Bearer d46fcb020e7ca37543c27e7c9f4e6521e0f5a5d7939a336de7e5d728077ca60e"
    }
    print("Running LLM to get illness...")
    response = requests.post(url, json=payload, headers=headers)

    return(json.loads(response.text)['output']['choices'][0]['text'].split('[INST]')[0]).strip()

async def get_recipes(medicine):
    url = "https://api.together.xyz/inference"
    illness = await get_illness(medicine)
    # illness = 'Headache'
    print("ILLNESS: ", illness)
    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.2",
        "prompt": 
        '''<s><<SYS>>
        You are a Holistic Health Coach. Given a drug, identify the sickness the person is having and provide Five alternative home-cooked recipes that could help alleviate the symptoms or support recovery. Each recipe should:
        Include ingredients known for their health benefits related to the specified condition or the effects of the medication.
        Mention any known dietary considerations or warnings for people with the specified condition.
        Provide a brief explanation of how each ingredient contributes to the recipe's potential health benefits. make benefits of each super/power ingredient differently.
        Ensure the recipes are full course type of meal. Output everything in JSON format only. Do not output anything apart from JSON.
    <</SYS>>
        [INST]
        Two recipes for person having cough.
        [/INST]
        {
        "recipes": [
            {
            "name": "Turmeric Ginger Chicken Soup",
            "description": "A soothing soup that combines the anti-inflammatory benefits of turmeric and ginger with the healing properties of chicken broth to help alleviate cough symptoms.",
            "ingredients": [
                "1 tablespoon olive oil",
                "4 cups chicken broth",
                "2 cups water",
                "1 chicken breast (skinless and boneless)",
                "1 cup chopped carrots",
                "1 cup chopped celery",
                "1/2 cup chopped onion",
                "2 garlic cloves, minced",
                "1 inch fresh ginger, grated",
                "1 teaspoon turmeric powder",
                "Salt and pepper to taste",
                "Fresh parsley for garnish"
            ],
            "instructions": "Heat olive oil in a large pot over medium heat. Add the onions, carrots, and celery and sauté until soft. Add garlic, ginger, and turmeric, sautéing for another minute. Pour in chicken broth and water, then add the chicken breast. Bring to a boil, then simmer for 20-25 minutes until the chicken is cooked through. Remove the chicken, shred it, and return it to the pot. Season with salt and pepper. Serve garnished with fresh parsley.",
            "health_benefits": {
                "Turmeric": "Contains curcumin, which has anti-inflammatory and antibacterial properties that can help soothe a cough.",
                "Ginger": "Helps to break down mucus, making it easier to expel and alleviating cough symptoms.",
                "Garlic": "Boosts the immune system and has antimicrobial effects, which can help fight the infection causing the cough.",
                "Chicken broth": "Provides hydration and helps soothe the throat.",
                "Olive oil": "Contains antioxidants and healthy fats, supporting overall health and immune function."
            },
            "dietary_considerations": "This recipe is gluten-free and can be made vegetarian by substituting chicken broth with vegetable broth and omitting the chicken breast."
            },
            {
                "name": "Garlic and Honey Roasted Carrots",
                "description": "Garlic and Honey Roasted Carrots are a sweet and savory side dish that perfectly combines the earthy flavor of roasted carrots with the mild sweetness of honey and the aromatic punch of garlic. This dish is not only a treat to your taste buds but also a healthful addition to any meal, offering a good source of vitamins, antioxidants, and anti-inflammatory benefits. Easy to prepare with just a few ingredients, it makes a delightful accompaniment to both casual and formal meals.",
            "ingredients": [
                "1 lb carrots, peeled and sliced",
                "2 tablespoons olive oil",
                "2 cloves garlic, minced",
                "2 tablespoons honey",
                "Salt and pepper to taste"
                ],
            "instructions": "Preheat the oven to 400°F (200°C). In a bowl, toss carrots with olive oil, garlic, honey, salt, and pepper. Spread on a baking sheet and roast for 25-30 minutes until tender and caramelized.",
            "health_benefits": {
                "Garlic": "Boosts the immune system and has antimicrobial effects, helping to fight off infections causing coughs.",
                "Honey": "Offers antimicrobial properties and can help soothe a sore throat and cough.",
                "Carrots": "Rich in beta-carotene, which converts to vitamin A and supports a healthy immune system."
                },
            "dietary_considerations": "This recipe is vegetarian and can be made vegan by substituting honey with maple syrup."
            }
                ]
        }
        [INST]
        Five recipes for person having '''+illness+'''.
        [/INST]
        ''',
        "max_tokens": 3000,
        "stop": ["</s>", "[/INST]", "[INST]"],
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "n": 1
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "Bearer d46fcb020e7ca37543c27e7c9f4e6521e0f5a5d7939a336de7e5d728077ca60e"
    }

    print("Running LLM to get recipes...")
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        recipes = (json.loads(response.text)['output']['choices'][0]['text'].split('[INST]')[0])
        print(recipes)
        return json.loads(recipes)
    else:
        return None

def get_names(recipes):
    names = []
    for recipe in recipes['recipes']:
        names.append(recipe['name'])
    
    return names

agent = Agent(
    name="recipe",
    seed="get recipe data",
    port=8001,
    endpoint="http://localhost:8001/submit",
)

@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {agent.name}")
    ctx.logger.info(f"With address: {agent.address}")
    ctx.logger.info(f"And wallet address: {agent.wallet.address()}")

@agent.on_query(model=RequestSchema, replies={ImageResponseSchema, ImageRequestSchema})
async def query_handler(ctx: Context, sender: str, _query: RequestSchema):
    ctx.logger.info("Query received")
    try:
        # do something here
        # medicine = _query.message
        medicine = 'Ibuprofen'

        # recipes = await get_recipes(medicine)
        # print("================================")
        # print(recipes)
        # print("================================")
        # recipe_names = get_names(recipes)
        # print(recipe_names)
        # print("================================")

        # recipe_names = ['Mint and Ginger Headache Tea', 'Quinoa Salad with Avocado and Beets', 'Almond Butter Banana Smoothie', 'Turkey and Vegetable Stir-Fry', 'Lemon and Ginger Chicken']
        recipe_names = ['Mint and Ginger Headache Tea']
        recipes = {'key': 'value'}
        if len(recipe_names) > 0:
            ctx.logger.info(f"Recipes acquired. Moving forward to image generation")
            resp = await query(
                GENERATE_RECIPE_IMAGE_AGENT, ImageRequestSchema(recipe_list=recipe_names), timeout=200
            )
        # print(resp)
        # print("RESPONSE:  ", dir(resp))
        # print(resp.payload)
        # print(type(resp.payload))
        x = [resp.payload]
        x.append(str(recipes))
        await ctx.send(sender, ImageResponseSchema(image_list=x))
    except Exception as e:
        print(e)
        await ctx.send(sender, ImageResponseSchema(image_list=[]))

# This decorator tells the protocol how to handle 'BookTableRequest' messages and what the valid replies are.
# @agent.on_message(model=ImageResponseSchema, replies=set())
# async def handle_book_request(ctx: Context, sender: str, msg: ImageResponseSchema):
#     if msg.image_list:
#         print(msg.image_list)
#         return {}
#         # ctx.logger.info(f"Image Generation Successful {msg.image_list}")
#     else:
#         ctx.logger.info(f"Image Generation Unsucessful")

if __name__ == "__main__":
    agent.run()

    


    