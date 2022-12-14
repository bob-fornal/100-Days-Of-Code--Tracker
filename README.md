# #100DaysOfCode Tracker

## Concept

This project is designed to track progress within #100DaysOfCode.

* Track Days Completed.
* Track Notes for Days (optional).
* Track larger Goals (optional).

The data for this application is stored in LocalStorage. It can be saved and loaded as a JSON file.

## Project Development Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.


### Run with Docker

If you have docker installed on your system (or on your prod env) you can run it easily with:

```bash
docker-compose up -d 
```

The tracker will be available at http://localhost:1337/. This is changeable within the docker-compose.yml.

Just change this line to what port you want to use:

```yaml
    ports:
      - "1337:80"
```

### Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
