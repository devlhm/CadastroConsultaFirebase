var app = { 
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener("click",app.inserir);
    },

    inserir: function(){
        let _nome = document.getElementById("nameInput").value;
        let _telefone = document.getElementById("phoneInput").value;
        let _origem = document.getElementById("origemInput").value;
        let _data_contato = document.getElementById("dateInput").value;
        let _observacao = document.getElementById("observacoes").value;

        var db = firebase.firestore();

        const data = {
            nome: _nome,
            telefone: _telefone,
            origem: _origem,
            data_contato: _data_contato,
            observacao: _observacao
        }

        db.collection("agendamentos").add(data)
        .then((docRef) => {
    		console.log("Document written with ID: ", docRef.id);
            window.location.href = cordova.file.applicationDirectory + "cadastrar.html";
		})
		.catch((error) => {
    		console.error("Error adding document: ", error);
		});;
    }
};

app.initialize();