var app = { 
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        app.deletar()
    },

    deletar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

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
            // do something
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
            } else {
                window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
            }
        }
    }
};

app.initialize();