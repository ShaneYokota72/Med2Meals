
model Goal {
  id  Int    @id @default(autoincrement())
  name String
  userGoals UserGoal[] 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("goal")
}

model Cusine {
  id           Int          @id @default(autoincrement())
  name         String
  userCuisines UserCusine[] 
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  @@map("cuisines")
}

model Diet {
  id  Int    @id @default(autoincrement())
  name String
  userDiets UserDiet[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("diet")
}

model UserCusine {
  id         Int      @id @default(autoincrement())
  userId     Int      
  cusineId   Int      
  user       User     @relation(fields: [userId], references: [id])
  cusine     Cusine   @relation(fields: [cusineId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("user_cuisines")
}


model UserDiet {
  id         Int      @id @default(autoincrement())
  userId     Int      
  dietId     Int      
  user       User     @relation(fields: [userId], references: [id])
  diet       Diet   @relation(fields: [dietId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("user_diets")
}


model UserGoal {
  id         Int      @id @default(autoincrement())
  userId     Int      
  goalId     Int      
  user       User     @relation(fields: [userId], references: [id])
  goal       Goal   @relation(fields: [goalId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("user_goals")
}

model Restaurant {
  id         Int      @id @default(autoincrement())
  name       String      
  imageUrl   String      
  Partys     Party[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("restaurant")
}

model Party {
  id         Int      @id @default(autoincrement())
  name       String      
  capacity   Int
  registered Int     @default(0)
  eventTime  DateTime
  restaurantId Int
  restaurant Restaurant     @relation(fields: [restaurantId], references: [id])
  UserPartys UserParty[]
  Reservations Reservation[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("party")
}

model UserParty {
  id     Int      @id @default(autoincrement())
  partyId Int
  userId Int
  party  Party    @relation(fields: [partyId], references: [id])       
  user   User     @relation(fields: [userId], references: [id])      
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("user_party")
}

model Reservation {
  id     Int      @id @default(autoincrement())
  partyId Int
  party  Party    @relation(fields: [partyId], references: [id])       
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  @@map("reservation")
}