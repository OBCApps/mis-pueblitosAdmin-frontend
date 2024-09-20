export class MessageController {

    constructor(currentComponent: any,nameSelector : string) {
        this.currentComponent = currentComponent;
        this.nameSelector = nameSelector;
    }



    // componente que recepciona el mensaje 
    currentComponent: any;

    // Nombre del Selector que se abrira
    nameSelector : string | any;
    
    // Elemento seleccionado desde el Selector
    selected: any;

}
