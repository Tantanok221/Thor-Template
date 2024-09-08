import { PlopTypes } from "@turbo/gen";
import fs from "fs";




export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setDefaultInclude({actionTypes: true})

  plop.setActionType("copy", (answers: object, config:any, plop: PlopTypes.NodePlopAPI) => {
    const {src, destination} = config.data;

    const source = plop.renderString(src, answers);
    const target = plop.renderString(destination, answers);
  
    fs.mkdirSync(target);
    console.log(source,target)
  
    fs.cpSync(source, target, {recursive: true})
    return 'Folder copied successfully'
  
  })
  

  plop.setGenerator("fe/", {
    description: "Generate Front End Project",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of this front end website?",
      },
    ],
    actions: [
      {
        type: "copy",
        data: {
          src: "{{ turbo.paths.root }}/turbo/generators/template/fe-template",
          destination: "{{ turbo.paths.root }}/fe/{{ lowerCase name }}",
        }
      },
      {
        type: "add",
        templateFile: "./template/fe-template.hbs",
        path: "{{ turbo.paths.root }}/fe/{{ lowerCase name }}/package.json",
      }
    ],
  });
  plop.setGenerator("be/", {
    description: "Generate Back End Project",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of this back end server?",
      },
      {
        type: "confirm",
        name: "database",
        message: "Do you want to use database packages?",
      },
      {
        type: "confirm",
        name: "redis",
        message: "Do you want to use redis packages?",
      },
      {
        type: "confirm",
        name: "clerk",
        message: "Do you want to use clerk authentication package?",
      },
    ],
    actions: [
      {
        type: "copy",
        data: {
          src: "{{ turbo.paths.root }}/turbo/generators/template/be-template",
          destination: "{{ turbo.paths.root }}/be/{{ lowerCase name }}",
        }
      },
      {
        type: "add",
        templateFile: "./template/be-template.hbs",
        path: "{{ turbo.paths.root }}/be/{{ lowerCase name }}/package.json",
      }
    ],
  });
}
