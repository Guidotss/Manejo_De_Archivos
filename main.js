const { table } = require('console');
const fs = require('fs'); 
let id = 0; 

class Contenedo{
    constructor(file){
        this.file = file
    }

    async Save(object){
        let id = 0; 
        const infoTXT = await fs.promises.readFile(this.file,'utf-8'); 
        const infoParsed = JSON.parse(infoTXT); 

        let productId = infoParsed.map(e => e.id)

        

        for(let i = 0; i < productId.length; i++){
            id < productId[i] || id == productId[i] ? id = productId[i] + 1 : id = 0
        }
        object.id = id

        infoParsed.push(object); 
        console.table(infoParsed);

        const newProdString = JSON.stringify(infoParsed); 
        const newProductTXT = await fs.promises.writeFile(this.file, newProdString, 'utf-8')

        return object.id
    }

    async GetById(number){
        
        try {
            const infoTXT = await fs.promises.readFile(this.file,'utf-8'); 
            const infoParsed = JSON.parse(infoTXT); 
            let index = infoParsed.map(e => e.id);

            if(index.includes(number)){
                let ids = index.indexOf(number); 
                console.log(infoParsed[ids]);

                return infoParsed[ids]; 
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

        return infoParsed; 

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
    id: '',
    nombre:"pizarra",
    precio:1231
}
Contenedor.Save(product1)

Contenedor.GetById(6);  

Contenedor.GetAll(); 

Contenedor.DeleteById(1);
