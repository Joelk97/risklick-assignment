# alpine (small node image)
FROM node:16

# Create app directory on node image and make it to
# the work directory
RUN mkdir -p /app
WORKDIR /app

# Copy the json packages
COPY package*.json /app

# install the dependencies
RUN npm install

# Copy the rest of the app into /app
COPY . /app


# Make sure port 3000 is accessible
EXPOSE 3000
# Run nmp run dev for dev env
CMD [ "npm", "run", "dev" ]
