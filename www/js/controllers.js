angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $localStorage) {
    //Set current date
    $scope.refresh = function() {
        $scope.days = moment().diff(moment(new Date($localStorage.get('currentDate', new Date()))), 'days');
        $scope.currentDate = moment(new Date($localStorage.get('currentDate', new Date()))).fromNow();
        $scope.$broadcast('scroll.refreshComplete');
    };
    //Refresh
    $scope.refresh();
    //Status icon
    $scope.statusDay = function() {
        if ($scope.days >= 0 && $scope.days <= 5) {
            return 'status-ok';
        } else if ($scope.days === 6) {
            return 'status-info';
        } else if ($scope.days >= 7 && $scope.days <= 9) {
            return 'status-warning';
        } else if ($scope.days === 10) {
            return 'status-alert';
        } else if ($scope.days === 11) {
            return 'status-alert2';
        } else {
            return 'status-danger';
        }
    };
    //Pluralize days
    $scope.pluralize = function(value) {
        if (value < 1) {
            return 'days';
        } else if (value > 1) {
            return 'days';
        } else {
            return 'day';
        }
    };
    $scope.status = function() {
        if ($scope.days >= 0 && $scope.days <= 5) {
            return 'ion-happy status-ok';
        } else if ($scope.days === 6) {
            return 'ion-sad status-info';
        } else if ($scope.days >= 7 && $scope.days <= 9) {
            return 'ion-sad status-warning';
        } else if ($scope.days === 10) {
            return 'ion-sad status-alert';
        } else if ($scope.days === 11) {
            return 'ion-sad status-alert2';
        } else {
            return 'ion-sad status-danger';
        }
    };
})

.controller('HistoryCtrl', function($scope, $localStorage, $ionicModal, History) {

    $scope.refresh = function() {
        $scope.history = History.all();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.refresh();

    $scope.format = function(date) {
        return moment(new Date(date)).format("dddd, MMMM Do YYYY, h:mm:ss a");
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/modals/confirm.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.openModal = function() {
        $scope.modal.show();
    };
    //Save date
    $scope.save = function() {
        var newDate = new Date();
        $localStorage.set('currentDate', newDate);
        var confirmed = $localStorage.updateObject('history', {
            date: newDate
        });
        if (confirmed) {
            //Close modal after save
            $scope.refresh();
            $scope.closeModal();
        }
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/modals/confirmDelete.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.deleteModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeDeleteModal = function() {
        $scope.deleteModal.hide();
    };

    // Open the login modal
    $scope.openDeleteModal = function() {
        $scope.deleteModal.show();
    };

    //Clear database
    $scope.remove = function() {
        var confirmed = $localStorage.clearDatabase();
        if (confirmed) {
            //Close modal after save
            $scope.refresh();
            $scope.closeDeleteModal();
        }
    };
})

.controller('AboutCtrl', function($scope) {});
