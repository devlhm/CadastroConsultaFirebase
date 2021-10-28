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
                $("#TableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory + "editar.html?telefone=" + doc.data().telefone + "'>Editar</a>&nbsp;|&nbsp;<a href='" + cordova.file.applicationDirectory + "www/excluir.html?telefone=" + doc.data().telefone + "'>Excluir</a></td>");
                $("#TableData").append("</tr>");
            });
        })
        .catch(err => {
            console.error(err);
        });
    },

    deletar: function(telefone){
        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", telefone);

        if (confirm('Deseja realmente excluir esse registro?')) {
            onConfirm(1);
        }

        // navigator.notification.confirm(
        //     'Deseja realmente excluir esse registro?',
        //     onConfirm,
        //     'Excluir',
        //     ['Sim','Não']
        // );

        function onConfirm(buttonIndex) {
            if(buttonIndex == 1){
                ag.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection("agendamentos").doc(doc.id).delete().then(() => {
                            console.log("Registro deletado!");
                            window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
                        }).catch((error) => {
                            console.error("Erro deletando registro: ", error);
                        });
                    });
                })
                .catch((error) => {
                    console.log("Erro acessando registros: ", error);
                });
            }
        }
    }

};

app.initialize();