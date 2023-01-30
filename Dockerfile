# Use an existing Node.js image as a base
FROM node:19

# Set the working directory in the container
WORKDIR /app

# Copy the package.json file to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

RUN npm install --prefix client --force

RUN npm run build

# Specify the command to run when the container starts
CMD ["npm", "start"]
