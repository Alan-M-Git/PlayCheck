PLAYCHECK

//Overview//
The project Playcheck, was created to note any videogames that have been completed, establsihing your dedication to completing games as much as possible. It demonstrates the fundamentals of React with knowledge on the functionality of the frontend/backend, the ability to integrate a cloud hosted database(Neon), which allows us to utilize CRUD operations which creates, reads, updates, and deletes any videogame listed that the user desires, and API Integration using fetch, showing the relationship between the client and the server. The application is designed to be simple and user-friendly, making it suitable for both casual and competitive gamers.


//Deployment//
The project has been deployed and is accessible on Vercel. Here are the following links:

Client(Frontend): https://playcheck-hi1itfm0h-alan-morales-projects-afc46a81.vercel.app/

Server(Backend):  https://playcheck-hi1itfm0h-alan-morales-projects-afc46a81.vercel.app/api/games

IMPORTANT: As of 12/22/25, the frontend side on Vercel has issues in regards to the functionality of buttons as a result of being deployed. The backend portion works fine on Vercel. However, both the frontend and backend work efficently when ran on your computer locally.



//Setup Instructions//
As mentioned, this project was built on React(Vite). To run this project locally, ensure that your development environment meets the necessary prerequisites, including React, Express, and Postgres. Once the prerequisites are installed, begin by cloning the project repository from GitHub. Navigate into the project directory and install all required dependencies using the appropriate package manager.

After the dependencies are installed, start the application by connecting using "cd Server" on your terminal, and then type "node index.js" afterwards. Once the application is running, it can be accessed locally in a web browser at localhost 8000 and port 8000. This local setup allows for development, testing, and experimentation without affecting the deployed version. Below are the following links for running the frontend and backend of the server locally on your computer, including the API.

Client(Frontend): http://localhost:8000/

Server(Backend): http://localhost:8000/api/games



//Reflections//
Throughout the development of this project, several aspects worked particularly well. The structure of the checklist form, and the CSS was easy to do, and seeing how it gave the site more character was interesting. I was also satisfied with the idea of creating a checklist that can even be for personal use.

However, the project also presented challenges. As mentioned before, the deployed version on vercel caused issues surrounding the response when the buttons are clicked being unable to fetch. This is not an issue when running the app locally, therfore I wonder what could be the issue that would allow me to properly use the checklist on the deployed version. The most challenging aspect however was understanding Neon and trying to connect the database to my server. I knew how to connect to a postgres database locally, but connecting to a database on a cloud hosted site without any knowledge beforehand was very confusing and challenging.

This project provided valuable learning experiences, including React, Postgres, API's, CRUD, and the relationship shared between the frontend and backend. If the project were to be continued, I would like to know how to fix my deployment issue on vercel. These enhancements would further refine the project and expand its functionality.