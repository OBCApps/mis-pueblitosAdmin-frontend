export class MessageController {

    constructor(currentComponent: any, nameSelector: string, method: string = null) {
        this.currentComponent = currentComponent;
        this.nameSelector = nameSelector;
        this.method = method;
    }



    // componente que recepciona el mensaje 
    currentComponent: any;

    // Nombre del Selector que se abrira
    nameSelector: string | any;

    // Elemento seleccionado desde el Selector
    selected: any;

    // EN caso no sea selector sino componente, y sera editar o crear
    method : any;
}
