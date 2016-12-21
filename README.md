# sinc-fe

This is the front-end for SINC.

## Getting started

Ensure you have a working version
of Node (v. 6 or later), NPM,
and Yarn.
Working in a virtualenv is strongly
recommended.

From the base directory, run

    $ yarn install

followed by

    $ yarn start

and then navigate to `http://localhost:8080` in your
browser. You should see the SINC login page.
(If you are not running `sinc-server`,
then you won't be able to do anything here.
Consult the docs for that project to
get it up and running.)

Once you have the SINC front-end up and running,
you should be ready to start making changes
to all the things that are broken. yarn
invokes webpack-dev-server, which should
compile your changes.

## About sinc-fe

sinc-fe uses the following tech stack
to render HTML:

* [React](https://facebook.github.io/react/) to manage the view layer;
* Redux to manage state;
* react-redux to connect React and Redux;
* react-router to handle routing;
* react-cookie to handle local storage;
* redux-form to handle HTML forms;
* Axios as the HTTP client to communicate with the back-end.

If you're unfamiliar with any of the above,
check out their documentation and, where available,
their tutorials.

sinc-fe uses SASS for generating style rules.

Assorted other bits and bobs:

* Moment.js for date handling

The back-end is communicating with a REST API,
which is documented there.

## Contributing
