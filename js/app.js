class Product {
    constructor(reference, quantity, size, gender, notes) {
        this.reference = reference;
        this.quantity = quantity;
        this.size = size;
        this.gender = gender;
        this.notes = notes;
    }
}

class UI {
    static addProduct(product, img) {
        // 
        const productsList = document.getElementById("products-adds");
        const elemnt = document.createElement("div");
        elemnt.setAttribute("class", "card mb-2 pt2");
        elemnt.innerHTML = `
        <div class="container p-3">
            <div class="row">            
                <div class="col-5" id="product-img">
                    <img class="img-fluid rounded-lg" src="${img}" alt="image">
                </div>
                <div class="col-7" id="product1"> 
                    <div id="product-resumen" name="product-resumen">           
                        <strong style="text-decoration: none;" name="a">Referencia: ${product.reference}</strong><br>
                        <strong style="text-decoration: none;" >Cantidad: ${product.quantity}</strong><br>
                        <strong style="text-decoration: none;" >Talla: ${product.size}</strong><br>
                        <strong style="text-decoration: none;" >Género: ${product.gender}</strong><br>
                        <strong style="text-decoration: none;" >Notas: ${product.notes}</strong><br>
                    </div>
                    <br>
                    <div class="row">
                    <button class="btn btn-success align-bottom" name="product-edit"><i class="far fa-edit"></i> Editar</button>&nbsp&nbsp
                    <button class="btn btn-danger align-bottom" name="product-delete"><i class="far fa-trash-alt"></i> Borrar</button>
                    </div>
                </div>
            <div>
        </div>
        `;

        const child = productsList.children[0];
        productsList.insertBefore(elemnt, child);

    }
    static deleteProduct(element, father) {
        if (element.name === "product-delete") {
            father.remove();
            UI.messageAddProduct("Eliminado correctamente", "danger");
        }
    }
    static messageAddProduct(message, cssClas) {
        // creaando el alert
        const element = document.createElement("div");
        element.className = `alert alert-${cssClas} mt-2`;
        element.appendChild(document.createTextNode(message));

        // agregando al dom
        const principal = document.getElementById("principal");
        const child = principal.children[0];
        principal.insertBefore(element, child);
        setTimeout(() => {
            element.remove();
        }, 2000);
    }
    static cleanInputsAddProduct() {
        document.getElementById("product-form").reset();
    }
    static async edditProduct(button, hijos) {
        var father = hijos[0].parentElement;
        if (button.name === "product-edit") {
            button.className = `btn btn-primary align-bottom`;

            // eliminando el br de la lista de productos y guardando contenido
            var hijosReales = [];
            let contenido = []; // atributos antiguos
            let cont = 0;
            for (let i = 0; i < hijos.length; i++) {
                if (hijos[i].textContent !== "") {
                    hijosReales[cont] = hijos[i];
                    contenido[cont] = UI.splitSacarreferencia(hijosReales[cont].textContent);
                    cont++;
                }
            }

            // insertar inputs para editar 
            father = hijos[0].parentElement;
            for (let i = 0; i < hijos.length; i++) {
                hijos[i].remove();
            }
            father.innerHTML = `
                <div class="form-group">
                    <input type="text" name="product-reference-edited" id="product-reference-edited" class="form-control" placeholder="Buzo, sudadera, etc..." value="${contenido[0]}" required>
                </div>
                <div class="form-group">
                        <input type="number" name="product-quantity-edited" id="product-quantity-edited" class="form-control" placeholder="Cantidad" value="${contenido[1]}" required>
                </div>
                <div class="form-group">
                        <input type="text" name="product-size-edited" id="product-size-edited" class="form-control" placeholder="Talla" value="${contenido[2]}" required>
                </div>
                <div class="form-group">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text " for="product-gender-edited">Genero</label>
                            </div>
                            <select class="custom-select" id="product-gender-edited" value="${contenido[3]}" required>
                            <option selected>Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="otro">otro</option>
                            </select>
                        </div>
                </div>
                <div class="input-group">
                    <textarea class="form-control" id="product-notes-edited" name="product-notes-edited" cols="20" rows="2" aria-label="With textarea" placeholder="Notes" >${contenido[4]}</textarea>
                </div>
            `;


            button.name = "product-edited";
            button.textContent = " Guardar";
            button.className = `btn btn-primary align-bottom`;

        } else if (button.name === "product-edited") {

            //capturar datos editados
            let reference = document.getElementById("product-reference-edited").value;
            let quantity = document.getElementById("product-quantity-edited").value;
            let gender = document.getElementById("product-gender-edited").value;
            let notes = document.getElementById("product-notes-edited").value;
            let size = document.getElementById("product-size-edited").value;

            //eliminando inputs
            //let array = father.children;

            const abuelo = father.parentElement;
            console.log(abuelo);

            father.remove();

            let codigo = document.createElement("div");
            codigo.setAttribute("id", "product-resumen");
            codigo.setAttribute("name", "product-resumen");
            codigo.innerHTML = `
                        <strong style="text-decoration: none;" name="a">Referencia: ${reference}</strong><br>
                        <strong style="text-decoration: none;" >Cantidad: ${quantity}</strong><br>
                        <strong style="text-decoration: none;" >Talla: ${size}</strong><br>
                        <strong style="text-decoration: none;" >Género: ${gender}</strong><br>
                        <strong style="text-decoration: none;" >Notas: ${notes}</strong><br>
            `;

            abuelo.insertBefore(codigo, abuelo.firstChild);

            button.name = "product-edit";
            button.textContent = " Editar"
            button.className = `btn btn-success align-bottom`;
        }
    }

    // Sacra los atributos de cada predido
    static splitSacarreferencia(cadena) {

        let separado = cadena.split(" ");
        return separado[1];

    }

    //generar PDF dividido
    static generarPDF() {

    }
}
var e; //--------------------------------------------------------------------------------------------
document.getElementById("product-form").addEventListener("submit", (e) => {
    const reference = document.getElementById("product-reference").value;
    const quantity = document.getElementById("product-quantity").value;
    const gender = document.getElementById("product-gender").value;
    const notes = document.getElementById("product-notes").value;
    const size = document.getElementById("product-size").value;
    var img;

    if (img = document.getElementById("product-image-uploader") === null) {
        img = "images/image.png";
    } else {
        img = document.getElementById("product-image-uploader").src;
    }


    const product = new Product(reference, quantity, size, gender, notes);
    UI.addProduct(product, img);
    UI.messageAddProduct("Agregado correctamente", "success")
    UI.cleanInputsAddProduct();

    e.preventDefault();
});

document.getElementById("products-adds").addEventListener("click", (e) => {

    if (e.target.name === "product-delete") {
        UI.deleteProduct(e.target, e.target.parentNode.parentNode.parentNode.parentNode.parentNode);
    } else if (e.target.name === "product-edit") {
        UI.edditProduct(e.target, e.target.parentElement.parentElement.children[0].children);
    } else if (e.target.name === "product-edited") {
        UI.edditProduct(e.target, e.target.parentElement.parentElement.children[0].children);
    }
});

document.getElementById("product-img-insert").onchange = (e) => {
    let render = new FileReader();

    render.readAsDataURL(e.target.files[0]);

    render.onload = () => {
        let previw = document.getElementById("product-previw"),
            image = document.createElement("img");
        image.className = "p-2 img-fluid rounded-lg";
        image.setAttribute("alt", "La imagen se ha movido o eliminado");
        image.setAttribute("id", "product-image-uploader");

        image.src = render.result;

        previw.innerHTML = ``;
        previw.append(image);
    }
};

document.getElementById("button-generate-PDF").addEventListener("click", () => {

    var totalHijos = document.getElementById("products-adds");
    console.log(totalHijos);

    //var resume = document.getElementById("product-resumen").children[0].;

    html2canvas(document.getElementById("products-adds"), {
        onrendered: (canvas) => {
            var image = canvas.toDataURL("images/image.png");
            var doc = new jsPDF('p', 'px', 'a4');
            doc.addImage(image, "JPEG", 20, 20);
            doc.save("test.pdf");
        }
    });

});