# Supertal

## Getting Started

### Server

- Create an env and populate with env.example
- Run this command to start server `cd server && yarn && yarn dev`

### APP

- Create an env and populate with env.example
- Run this command `yarn && yarn android or yarn ios`

### Prerequisites

What things you need to install the software and how to start this project successfully.

- Make sure postgress is installed. (Protip: Use docker `docker pull postgres && cd server && docker-compose up -d` )
- Once DB is connected make sure to populate the tables. To do this run `psql -U supertal -d supertal -f server/sql/schema.sql`
- Nodejs should be >= 18
- Use Yarn. To install yarn run gst`npm i -g yarn`
