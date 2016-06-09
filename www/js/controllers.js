angular.module('starter.controllers', [])
  .controller('ChatsCtrl', function($scope, Chats) {
    $scope.novo = {
      peso : 80
    };
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
    $scope.inserir = function(){
      Chats.add($scope.novo);
      $scope.novo = {
        peso : 80
      };
    }
  })
  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })
  .controller('AccountCtrl', function($scope, Aguas) {
    $scope.nova = {
      quantidade : 200
    };
    $scope.aguas = Aguas.all();
    $scope.remove = function(agua) {
      Aguas.remove(agua);
    };
    $scope.inserir = function(){
      Aguas.add($scope.nova);
      $scope.nova = {
        quantidade : 200
      };
    };
  })
  .controller('DashCtrl', function($scope, Camera, $http, UploadService, Properties, SharedUser, Refeicoes) {
    var photoUrlToSave = "";

    $scope.picture;
    $scope.tempo = new Date();

    $scope.uploadedFile = function(element) {
      $scope.$apply(function($scope) {
        $scope.files = element.files;
      });
    };

    $scope.addFile = function() {
      UploadService.uploadfile($scope.files,
        function( data ) // success
        {
          console.log(data);
          $scope.picture = Properties.viewPhotoUrl() + data;
          photoUrlToSave = Properties.uploadsBarraFotos() + data;
          console.log('uploaded');
        },
        function( data ) // error
        {
          console.log(data);
          console.log('error');
        });
    };

    $scope.registarRefeicao = function() {
      $scope.user = SharedUser.loadUser();

      console.log('DashCtrl - LOGGED USER:');
      console.log($scope.user);

      var refeicao = {
        esporte : $scope.user.esporte,
        atleta : $scope.user.nome,
        foto : photoUrlToSave
      }

      Refeicoes.registrar(refeicao,function(data){
        console.log(data);
      })
    }

  })
  .controller('LoginCtrl', function($scope, $http, Properties, Login, $location, SharedUser) {

    $scope.user = {};
    $scope.errorMessage = null;
    $scope.logado = false;

    $scope.login = function(){
      Login.login($scope.user.username,$scope.user.password
        ,function(retornado){
          if(retornado == null) {
            $scope.errorMessage = "Usuario ou senha inválidos!";
          } else {
            $location.path('/#/tab/dash');
            $scope.logado = true;
            $scope.user = retornado;
            SharedUser.saveUser(retornado);
            $scope.errorMessage = null;
          }
          console.log(retornado);
        });
      // $scope.user = {};
    }

/*
 function(data) {
 console.log(data);
 retornado = data;
 }
 */


  });
