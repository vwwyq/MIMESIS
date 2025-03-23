# MIMESIS
## Political Art Blog Website

### Frontend Deployment
The frontend of MIMESIS is deployed on Netlify:  
https://radiant-pixie-25acee.netlify.app  
*Note: This is only the frontend view. Full functionality requires the backend.*

---

## Instructions to Run the Project

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **MongoDB** (local or cloud instance)
- **Git**

---

## Clone the Repository
```sh
git clone https://github.com/vwwyq/MIMESIS.git
```

---

## Setup Backend
```sh
cd api
npm install
cp .env.example .env  # Ensure you configure .env with your MongoDB connection string
npm run dev
```
**Expected Output:**
- Server running on port 3000.
- Connected to MongoDB.

---

## Setup Frontend
```sh
cd client
npm install
cp .env.example .env  # Ensure correct environment variables
npm run dev
```
**Expected Output:**
```
VITE v5.4.14  ready in 386 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Running the Full Application
Ensure both frontend and backend are running:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:3000](http://localhost:3000)

### Interactive Features:
- Use the **navigation bar** to explore different sections of the blog.
- **Hover over images or buttons** to see animations and interactive effects.

---

## Environment Variables
Ensure you update your `.env` files for both frontend and backend with the correct MongoDB connection string and other necessary credentials.

---

## Contributing
Feel free to submit pull requests or issues for improvements.

Happy coding! 

