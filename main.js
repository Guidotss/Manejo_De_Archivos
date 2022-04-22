const fs = require('fs'); 
let id = 0; 

class Contenedo{
    constructor(file){
        this.file = file
    }

    async Save(object){
        const infoTXT = await fs.promises.readFile(this.file,'utf-8'); 

        const infoParsed = JSON.parse(infoTXT);

        let nuevaInfo = infoParsed.push(object); 

        const nuevosProductosString = JSON.stringify(infoParsed); 

        const nuevosProductoTXT = await fs.promises.writeFile(this.file,nuevosProductosString,'utf-8'); 
    }

    async GetById(number){
        
        try {
            const infoTXT = await fs.promises.readFile(this.file,'utf-8'); 
            const infoParsed = JSON.parse(infoTXT); 
            let index = infoParsed.map(e => e.id);

            if(index.includes(number)){
                let ids = index.indexOf(number); 
                console.log(infoParsed[ids]);
            }else{
                console.log(null);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async GetAll(){

       try {

        const infoTXT = await fs.promises.readFile(this.file,'utf-8'); 
        const infoParsed = JSON.parse(infoTXT);
        console.log(infoParsed);

       }catch(error){
           console.log(error);
       }
    }

 

    async DeleteById(number){

       try {
        const infoTXT = await fs.promises.readFile(this.file,'utf-8'); 
        const infoParsed = JSON.parse(infoTXT); 
        
        const filtrado = infoParsed.filter(product => product.id != number); 
        console.log(filtrado);

        const filtradoString = JSON.stringify(filtrado); 
        const newProduct = await fs.promises.writeFile(this.file, filtradoString,'utf-8'); 

       } catch (error) {
           console.log(error);
       }
    }


    async DeleteAll(){
        const infoTXT = await fs.promises.readFile(this.file);
        const infoParsed = JSON.parse(infoTXT); 

        const vacio = infoParsed.splice(0, infoParsed.lenght); 
        const vacioString = JSON.stringify(vacio);

        const newProduct = await fs.promises.writeFile(this.file,vacioString,'utf-8'); 

        console.log(vacio);

    }

}





let Contenedor = new Contenedo('./productos.txt'); 

const product1 = {
    nombre:"pizarra",
    precio:1231
}


Contenedor.Save(product1)

Contenedor.GetById(2);  

Contenedor.GetAll(); 

Contenedor.DeleteById(1);