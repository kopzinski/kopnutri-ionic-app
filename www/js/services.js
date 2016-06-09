angular.module('starter.services', [])
.factory('Properties', function() {

  var host = "192.168.1.5";
  // var host = "localhost";
  // var host = "172.20.10.2";
  var port = "3000";
  var prefix = "v1";
  var baseUrl = "http://" + host + ":" + port + "/" + prefix + "/";

  var upload = "photos/";
  var viewPhoto = "uploads/fotos/";
  var aguasUrl = "aguas/";
  var pesosUrl = "pesos/";
  var loginUrl = "login/";
  var refeicoesUrl = "refeicoes/";

  return {
    host : function () {
      return host;
    },
    port : function() {
      return port;
    },
    prefix : function() {
      return prefix;
    },
    baseUrl : function() {
      return baseUrl;
    },
    uploadPhotoUrl : function () {
      return baseUrl + upload;
    },
    viewPhotoUrl : function () {
      return "http://" + host + ":" + port + "/"  + viewPhoto;
    },
    uploadsBarraFotos : function () {
      return viewPhoto;
    },
    aguasUrl : function () {
      return baseUrl + aguasUrl;
    },
    pesosUrl : function () {
      return baseUrl + pesosUrl;
    },
    loginUrl : function () {
      return baseUrl + loginUrl;
    },
    refeicaoUrl : function () {
      return baseUrl + refeicoesUrl;
    }

  }
})
.factory('Chats', function($http, Properties) {
  var pesos = [];

  $http.get(Properties.pesosUrl())
    .success(function(data){
      data.forEach(function (element) {
        console.log(element);
        pesos.push({
          id: element._id,
          peso: element.peso,
          gordura: element.gordura,
          musculo: element.musculo,
          agua: element.agua,
          data: element.data
        });
      });
    })
    .error(function(data)
    {
      console.log('erro');
      console.log(data);
    });


  return {
    add: function(peso) {
      peso.data = new Date();

      $http.post(Properties.pesosUrl(),peso)
        .success(function(data) {
          pesos.push(data);
        })
        .error(function(data) {
          console.log("Erro ao adicionar registro de Pesp");
          console.log(data);
        });
      return peso;
    },
    all: function() {
      return pesos;
    },
    remove: function(peso) {
      var config = {
        headers : {
          'Access-Control-Allow-Methods' : 'DELETE'
        },
      };

      $http.delete(Properties.pesosUrl() + peso.id, config)
        .success(function(data){
          // aguas.splice(aguas.indexOf(peso), 1);
        })
        .error(function (data) {
          console.log("Erro ao remover registro de Peso");
          console.log(data);
        });
      pesos.splice(pesos.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < pesos.length; i++) {
        if (pesos[i].id === parseInt(chatId)) {
          return pesos[i];
        }
      }
      return null;
    }
  };
})
.factory('Aguas', function($http, Properties) {
  var aguas = [];
  $http.get(Properties.aguasUrl())
    .success(function(data){
      data.forEach(function (element) {
        aguas.push({
          id: element._id,
          quantidade: element.quantidade,
          data: element.data
        });
      });
    })
    .error(function(data)
    {
      console.log('erro');
      console.log(data);
    });

    return {
      add: function(agua) {
        agua.data = new Date();
        var aguaTmp = {};

        $http.post(Properties.aguasUrl(),agua)
          .success(function(data) {
            aguas.push(data);
          })
          .error(function(data) {
            console.log("Erro ao adicionar registro de Agua");
            console.log(data);
          });
        return agua;
      },
      all: function() {
        return aguas;
      },
      remove: function(agua) {
        var config = {
          headers : {
            'Access-Control-Allow-Methods' : 'DELETE'
          },
        };

        $http.delete(Properties.aguasUrl() + agua.id, config)
          .success(function(data){
            // aguas.splice(aguas.indexOf(agua), 1);
          })
          .error(function (data) {
            console.log("Erro ao remover registro de Agua");
            console.log(data);
          });
        aguas.splice(aguas.indexOf(agua), 1);
      },
      get: function(aguaId) {
        for (var i = 0; i < aguas.length; i++) {
          if (aguas[i].id === parseInt(aguaId)) {
            return aguas[i];
          }
        }
        return null;
      }
    };
  })
.factory('Refeicoes', function($http, Properties) {

  return {
    registrar: function(refeicao, success) {
      refeicao.data = new Date();
      refeicao.status = 'NAO_AVALIADO';

      $http.post(Properties.refeicaoUrl(),refeicao)
        .success(success)
        .error(function(data) {
          console.log("Erro ao adicionar registro de Refeicao");
          console.log(data);
        });
      return null;
    }
  };
})
.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

})
.factory('UploadService', function ($http, Properties) {
  return {
    uploadfile : function(files,success,error) {

      var url = Properties.uploadPhotoUrl();

      for ( var i = 0; i < files.length; i++)
      {
        var fd = new FormData();

        fd.append("file", files[i]);

        $http.post(url, fd, {

            withCredentials : false,

            headers : {
              'Content-Type' : undefined
            },
            transformRequest : angular.identity

          })
          .success(success)
          .error(function(data)
          {
            console.log(data);
          });
      }
    }
  }
})
.factory('Login', function($http, Properties) {
  var retornado = {};

  return {
    login: function(username, password, success) {
      $http.post(Properties.loginUrl(),{login : username, senha : password})
        .success(success)
        .error(function(data) {
          console.log("Erro ao adicionar registro de Pesp");
          console.log(data);
        });
      return retornado;
    }
  };
})
.factory('SharedUser', function($http) {
  var savedUser = {};

  return {
    saveUser: function(user) {
      console.log('saving user...');
      console.log(user);
      savedUser = user;
      return savedUser;
    },
    loadUser: function() {
      console.log('loading user...');
      console.log(savedUser);
      return savedUser;
    }
  };
})
;
