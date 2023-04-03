FROM node:14
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
ENV PORT=3000
ENV MONGO_URI=mongodb:mongodb://mongo:27017/products
EXPOSE 3000
CMD ["npm", "start"]
