var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnListar").addEventListener("click",app.listar);
    },
    
    listar: function(){
        var db = firebase.firestore();
        var ag = db.collection("agendamentos");

        ag.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                $("#TableData").append("<tr>");
                $("#TableData").append("<td scope='col'>" + doc.data().nome + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().telefone + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().origem + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().data_contato + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().observacao + "</td>");
                $("#TableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory + "editar.html?telefone=" + doc.data().telefone + "'>Editar</a>&nbsp;|&nbsp;<a href='" + cordova.file.applicationDirectory + "www/excluirClientes.html?telefone=" + doc.data().telefone + "'>Excluir</a></td>");
                $("#TableData").append("</tr>");
                //a
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

};

app.initialize();