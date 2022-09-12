# Worle Covid-19 Report

This project provides an analysis of the situation of covid-19 and its impact on various countries and regions around the world.

It provides the total number of cases, tests, recoveries and deaths per country. It then provides a comparison of these statistics by continent.

The data is based on a dataset downloaded from Kaggle. Although Kaggle is a well known source of statistical data I cannot totally verify the accuracy of this dataset.

## Installation

To install this project locally

1.  clone the code to your lacal machine
2.  change directory to the project folder
3.  run `npm install` to down the required packages
4.  run `npm start`

To compile the files for production

5.  run `npm run build`

## Build

This is version 0.1 f the project. The code is stable but has not further testing with automated tools such as Jasmine, poppeteer, Mocha, Selenium or similar.

The design and UI also need further work.

Mobile responsiveness is good but large tables break the design when you scroll the screen to reveal more of the table.

## Database Design

The database used in this project is Mongodb. Mangodb is an efficient, document based database system that is easy to use and quite scalable.

The database is hosted on Atlas in the cloud.

## FullStack

The website is a full stack application based on node js, espress and ejs. Node JS provides the runtime environment and server-side processing while ejs templating, javascript, css and html are used on the client-side to present data coming from the server.

## MVC

To keep the code clean and easy to manage, the MVC design pattern is used for the most part.

The routes receive a request and pass it to the **Controller**.

The controller then handles the request, connecting with the **Model** if necessary and passing data to the **View**.

An example of how this is implemented in this project is shown in the following code snippet.

The website user sends a request to use **_list_** route. This request is passed on to the **_userController_** and handled by the **_listUsers_** function.

//define user routes

    router.get('/list', userController.listUsers);

The **_listUsers_** function of the **userController** will query the database for a list of all the users via the **_UserModel._** The data retrieved is then passed on to the **_user-list_** view.

    const listUsers = async (req, res, next) => {

        try{
            //get all users from database
      const userData = await UserModel.find({})

            //show the user list page
      res.render('user-list', {
                title: 'User List',
                userData,
                auth: getAuth()
            });

        }catch (error) {
            //display error in console
      console.log(error);
        }

    }

When the data reaches the **_user-list.ejs_** view file, it is rendered with the help of the ejs templating engine, html, javascript and css.

    <div class="covid\_\_data\_wrapper">
          <table class="data-table">
              <thead>
                  <tr>
                      <th scope="col">Use ID</th>
                      <th scope="col">fullname</th>
                      <th scope="col">email</th>
                      <th scope="col"></th>
                  </tr>
              </thead>

              <% userData.forEach(function (data) { %>

                  <tbody>
                      <tr>
                          <td><%= data._id %></td>
                          <td><%= data.fullname %></td>
                          <td><%= data.email %></td>
                          <td>
                              <% if(auth.isAdmin){ %>
                                  <a href="/users/edit/<%= data._id%>">
                                      <button>Edit</button>
                                  </a>
                                  <a href="/users/delete/<%= data._id%>">
                                      <button>Delete</button>
                                  </a>
                              <% } %>

                          </td>

                      </tr>
                  </tbody>
              <% }) %>

          </table>

      </div>

  </div>

## Security and Scalability

The system uses a token based authentication using JSON Web Tokens (TWT). This basically allows the user to request a token from the web server and present that token for any request that requires access to a protected route.

For additional security the generated token is not stored in the client browser but on the server. So to authenticate, the system retrieves the token from localstorage on the server and verify it.

As can be seen in the code the verification code will allow tokens send in the post body, as query string or in the request header. However, in my implementation, I chose the option to store token on the server.

To improve security further, all passwords are encrypted to a high level with the help of **_bcrypt_** Node package. See code snippet below.

    //get user submitted data
    const {fullname, email, password} = req.body

    // check if user enters all data
    if (!(email && password && fullname)) {
        res.status(400).send("Please complete all fields")
    }

    // check if user already exist
    // search for user in database
    const existingUser = await UserModel.findOne({ email })

    //if user already exists then respond with error message
    if (existingUser) {
        return res.status(409).send("A user with this email already exists")
    }

    //Encrypt the user password for better security
    encryptedPassword = await bcrypt.hash(password, 10);

## Testing

More testing is needed before the project is ready for production

## Contributors

The project has one contributor and that is me.

## License

This project is the property of my university and myself

## Conclusion

To conclude, it must be noted that the data used in this project is mainly for educational purposes only. The Worldometer data is regularly updated and I am not quite sure about the scope or time frame covered by the dataset. However, I do believe that the data is valid from a country and region wise comparison.
