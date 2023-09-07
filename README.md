## Welcome to the repo of my assignment app

The app runs inside of a docker container. The container is structured with three images:

- mariadb
- next-app
- cron

To setup everything make sure to have installed docker compose.
In the next step enter inside of the next-app folder with the terminal and run
**MAke sure ports 3000 and 3306 are free**
**docker-compose up**

Docker will build the app. It takes up to 3 minutes.

When everything is setup, you can navigate to [localhost:3000](http://localhost:3000)
The best browser to run the app is chrome (not optimized for other browsers)

You should see the homepage of the app. Here you can choose either to see the posts, to sign-in or to sign-up.
The posts are only visible to signed in users, for this reason I suggest you to open the sign-up page.
It may take a while (this is due to the dev environment of the app).
In the sign-up page you can register you by entering your name, your email and your password.
Once you are registered, the app redirects you to the sign-in page, where you can sign in with the email and password.
One you are signed-in, the app redirects you to the dashboard, where you will see the posts and comments that are already in the DB.

**It may take a while, due to the dev environment.**

If you can't see the posts after a few seconds, just refresh the page.

When you are able to see the posts, you can either choose to comment one of them, just by writing into the comment box of the chosen post and pushing the button "comment" or you can create a new blog post.

Each post has also a slug associated to it (you can see it if you hover on the title of the post). This would be necessary to navigate to the dynamic route of the post.

Each post and comment has also the information about the author that wrote them. (Relations between the database tables).

The posts from the Risklick API are updated one time per day by a batch file run by the cron application. The api script checks if the post slug is already present in the database or not. If not, it creates a new post with the information contained in the Risklick post.
To simulate the function on the dashboard there is a button "update Risklick post". If you click it, wait the app to fetch the data and then refresh the page you will see the post.

The fetching for all the db data ist at ths [link](http://localhost:3000/api/get-db-data)

TODOS:

- transform date format of Risklick post to match format in the db.
- Dynamic routing for the posts
- Modify and Delete posts and comments
