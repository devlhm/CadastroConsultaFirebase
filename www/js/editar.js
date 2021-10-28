var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);

        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");
        if(getTelefone)
            app.buscar();
    },

    buscar: function(){
        alert("clicou");
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            alert(querySnapshot);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("nameInput").value = doc.data().nome;
                document.getElementById("phoneInput").value = doc.data().telefone;
                document.getElementById("origemInput").value = doc.data().origem;
                document.getElementById("dateInput").value = doc.data().data_contato;
                document.getElementById("observacoes").value = doc.data().observacao;
            });
        })
        .catch((error) => {
            alert(error);
            console.log("Error getting documents: ", error);
        });
    },

    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let _nome = document.getElementById("nameInput").value;
        let _telefone = document.getElementById("phoneInput").value;
        let _origem = document.getElementById("origemInput").value;
        let _data_contato = document.getElementById("dateInput").value;
        let _observacao = document.getElementById("observacoes").value;

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("agendamentos").doc(doc.id);

                return dados.update({
                    nome: _nome,
                    telefone: _telefone,
                    origem: _origem,
                    data_contato: _data_contato,
                    observacao: _observacao
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

};

app.initialize();