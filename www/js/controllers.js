angular.module('r1p.controllers', ['chart.js', 'validation.match'])

.controller('AppCtrl', ['$scope', '$ionicModal', '$localStorage', '$http', 'baseURL', '$ionicLoading', '$ionicSlideBoxDelegate', '$ionicHistory',
        function ($scope, $ionicModal, $localStorage, $http, baseURL, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory) {
    $scope.baseURL = baseURL;
    // key to store current recital code in local storage
    var CURRENT_RECITAL_CODE = "CurrentRecitalCode";
    // key to stores an object in the localstorage for current reading
    var CURREENT_READING = "CurrentReading";
    $scope.currentRecitalRead = {
        code: "KHATMA",
        page: 2,
        pages: 5,
        fatiha: true
    };
    $scope.cRc = {
        crc: ""
    };
    $scope.images = [];
    // Create the read modal that we will use later
    $scope.openModal = function (item) {
        var modalOptions = { scope: $scope, animation: 'slide-in-up' };
        $ionicModal.fromTemplateUrl('templates/read.html', modalOptions).then(function (dialog) {
            $scope.modal = dialog;
            $scope.modal.show();
        });
    }
    // Triggered in the read modal to close it
    $scope.closeRead = function () {
        $scope.images = [];
        $scope.modal.remove();
    };

    // Open the read modal
    $scope.read = function () {
        $scope.currentRecitalRead = $localStorage.getObject(CURREENT_READING, '{}');
        if ($scope.currentRecitalRead.code === undefined) {
            $scope.cRc.crc = $localStorage.get(CURRENT_RECITAL_CODE, '');   // get the recital code from local storage
            console.log($scope.cRc.crc);
            if (!$scope.cRc.crc) {
                $scope.cRc.crc = "KHATMA";
                $localStorage.store(CURRENT_RECITAL_CODE, $scope.cRc.crc);
            }
            $http.post(baseURL+'recitals/read1', $scope.cRc)
                .success(function (recital) {
                    $scope.currentRecitalRead = recital;
                    $localStorage.storeObject(CURREENT_READING, $scope.currentRecitalRead);
                    setUpInitialRead();
                })
                .error(function (error) {
                    $ionicLoading.show({
                        template: '<ion-spinner icon="android"></ion-spinner><p style="color:azure">record not available</p>',
                        duration: 3000
                    });
                });
        } else {
            setUpInitialRead();
        };
    };
    var setUpInitialRead = function () {
        $scope.images = [];
        if ($scope.currentRecitalRead.fatiha) $scope.images.push(baseURL + "images/1.jpg");
        var s = $scope.currentRecitalRead.page;
        $scope.images.push(baseURL + "images/" + s + ".jpg");
        var n = $scope.currentRecitalRead.pages - 1;
        if (n) {
            n--;
            s++;
            $scope.images.push(baseURL + "images/" + s + ".jpg");
        }
        if (n) {
            n--;
            s++;
            $scope.images.push(baseURL + "images/" + s + ".jpg");
            s++;
            $scope.images.push(baseURL + "images/" + s + ".jpg");
            s++;
            $scope.images.push(baseURL + "images/" + s + ".jpg");
        }
        $scope.openModal();
    };
    $scope.changeSlide = function (item) {
        $ionicSlideBoxDelegate.slide(item);
    };
    // Perform the complete read action when the user clicks the check mark 
    $scope.completeRead = function () {
        $scope.currentRecitalRead.code = undefined;
        $localStorage.remove(CURREENT_READING);
        $scope.images = [];
        $scope.modal.remove();
    };
    $scope.$on("$ionicView.afterLeave", function () {
        $ionicHistory.clearCache();
    });
}])

//
    // start of IndexController -------
    // -----------------
    //
    .controller('IndexController', ['$scope', '$http', '$localStorage', 'baseURL', '$ionicModal', '$ionicLoading', '$ionicSlideBoxDelegate', '$ionicHistory',
                        function ($scope, $http, $localStorage, baseURL, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory) {
        $scope.baseURL = baseURL;
        $scope.progressPages = {
            K1: 0,
            K2: 0,
            K5: 0
        };
        $scope.showKHATMA = true;
        $scope.showKHATM2 = false;
        $scope.showKHATM5 = false;
        $scope.whichKhatma = "KHATMA";
        $scope.labels = ["Read", "UnRead"];
        $scope.data = [20, 80];
        $scope.kolors = ["#c6a119", "#f9ead6"];
        // key to store current recital code in local storage
        var CURRENT_RECITAL_CODE = "CurrentRecitalCode";
        // key to stores an object in the localstorage for current reading
        var CURREENT_READING = "CurrentReading";
        $scope.currentRecitalRead = {
            code: "",
            page: 0,
            pages: 0,
            fatiha: true
        };
        $scope.cRc = {
            crc: ""
        };
        $scope.images = [];
        // Create the read modal that we will use later
        $scope.openModal = function (item) {
            var modalOptions = { scope: $scope, animation: 'slide-in-up' };
            $ionicModal.fromTemplateUrl('templates/read.html', modalOptions).then(function (dialog) {
                $scope.modal = dialog;
                $scope.modal.show();
            });
        }
        // Triggered in the read modal to close it
        $scope.closeRead = function () {
            $scope.images = [];
            $scope.modal.remove();
        };
        // Open the read modal
        $scope.read = function (k) {
            $scope.currentRecitalRead = $localStorage.getObject(CURREENT_READING, '{}');
            if ($scope.currentRecitalRead.code === undefined) {
                $scope.cRc.crc = k;
                $http.post(baseURL + 'recitals/read1', $scope.cRc)
                    .success(function (recital) {
                        $scope.currentRecitalRead = recital;
                        $localStorage.storeObject(CURREENT_READING, $scope.currentRecitalRead);
                        setUpInitialRead();
                    })
                    .error(function (error) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon="android"></ion-spinner><p style="color:azure">record not available</p>',
                            duration: 3000
                        });
                    });
            } else {
                setUpInitialRead();
            };
        };
        var setUpInitialRead = function () {
                $scope.images = [];
                if ($scope.currentRecitalRead.fatiha) $scope.images.push(baseURL + "images/1.jpg");
                var s = $scope.currentRecitalRead.page;
                $scope.images.push(baseURL + "images/" + s + ".jpg");
                var n = $scope.currentRecitalRead.pages - 1;
                if (n) {
                    n--;
                    s++;
                    $scope.images.push(baseURL + "images/" + s + ".jpg");
                }
                if (n) {
                    n--;
                    s++;
                    $scope.images.push(baseURL + "images/" + s + ".jpg");
                    s++;
                    $scope.images.push(baseURL + "images/" + s + ".jpg");
                    s++;
                    $scope.images.push(baseURL + "images/" + s + ".jpg");
                }
                $scope.openModal();
        };
        $scope.changeSlide = function (item) {
                $ionicSlideBoxDelegate.slide(item);
        };
        // Perform the complete read action when the user clicks the check mark 
        $scope.completeRead = function () {
            $scope.currentRecitalRead.code = undefined;
            $localStorage.remove(CURREENT_READING);
            $scope.images = [];
            $scope.modal.remove();
        };
        $scope.changeCard = function () {
            if ($scope.showKHATMA == true) {
                $scope.showKHATM2 = true;
                $scope.showKHATMA = false;
                $scope.whichKhatma = "KHATM2";
                $scope.data = [$scope.progressPages.K2, (604 - $scope.progressPages.K2)];
                $scope.kolors = ["#007537", "#f9ead6"];
            } else if ($scope.showKHATM2 == true) {
                $scope.showKHATM5 = true;
                $scope.showKHATM2 = false;
                $scope.whichKhatma = "KHATM5";
                $scope.data = [$scope.progressPages.K5, (604 - $scope.progressPages.K5)];
                $scope.kolors = ["#a01f80", "#f9ead6"];
            } else if ($scope.showKHATM5 == true) {
                $scope.showKHATMA = true;
                $scope.showKHATM5 = false;
                $scope.whichKhatma = "KHATMA";
                $scope.data = [$scope.progressPages.K1, (604 - $scope.progressPages.K1)];
                $scope.kolors = ["#c6a119", "#f9ead6"];
            }
        };
        $scope.initStart = function () {
            var recitalCode = "KHATMA";
            $http.get(baseURL+'recitals/' + recitalCode)
                .success(function (recital) {
                    $scope.progressPages.K1 = recital.page;
                    $scope.data = [$scope.progressPages.K1, (604 - $scope.progressPages.K1)];
                    recitalCode = "KHATM2";
                    $http.get(baseURL + 'recitals/' + recitalCode)
                        .success(function (recital) {
                            $scope.progressPages.K2 = recital.page;
                            recitalCode = "KHATM5";
                            $http.get(baseURL + 'recitals/' + recitalCode)
                                .success(function (recital) {
                                    $scope.progressPages.K5 = recital.page;
                                });
                        });
                });
        };
        $scope.$on("$ionicView.afterLeave", function () {
            $ionicHistory.clearCache();
        });
    }])
    .controller('AboutController', ['$scope', '$http', '$location', 'baseURL', function ($scope, $http, $location, baseURL) {

        $scope.baseURL = baseURL;
        $scope.aboutInfo = {        // These counters are aggregates for the about form
            codesGenerated: 0,
            recitalsTotal: 0,
            pagesTotal: 0,
            fatihas: 0
        };
        $scope.aboutR1P = function () {
            $http.get(baseURL+'recitots', { headers: { 'Cache-Control': 'no-cache' } })
                    .success(function (recitots) {
                        $scope.aboutInfo.codesGenerated = recitots.codes;
                        $scope.aboutInfo.recitalsTotal = recitots.recitals;
                        $scope.aboutInfo.pagesTotal = recitots.pages;
                        $scope.aboutInfo.fatihas = recitots.fatihas;
                    });
            //
            // http get the data from the aggregates data table fill the form information for display
            //
        };
        $scope.hideAbout = function () {
            $location.path('/home');
        };
    }])
    .controller('HelpController', ['$scope', '$location', function ($scope, $location) {
        $scope.thankYou = function () {
            $location.path('/home');
        };
    }])
    .controller('EntryController', ['$scope', '$location', '$http', '$localStorage', 'baseURL', '$ionicLoading', '$ionicHistory',
                    function ($scope, $location, $http, $localStorage, baseURL, $ionicLoading, $ionicHistory) {
        $scope.baseURL = baseURL;
        var CURRENT_RECITAL_CODE = "CurrentRecitalCode";
        $scope.crc = "";
        $scope.recitals = {        // These counters are aggregates for the about form
            recitalCode: "",
            recitalCodeConfirm: ""
        };
        $scope.form = {};
        // retrieve the current recital code (crc) from storage
        // if no current recital code (crc) exists use "KHATMA", the genral code and
        // save it in local storage
                        // show the current recital code
            $scope.crc = $localStorage.get(CURRENT_RECITAL_CODE, '');
            if (!$scope.crc) {
                $scope.crc = "KHATMA";
                $localStorage.store(CURRENT_RECITAL_CODE, $scope.crc);
            }
        // http check if the recital code exists in the recitals table
        // if exists store in local storage for future access
        // if does not exist raise error
        $scope.recitalEntry = function () {
            console.log($scope.recitals.recitalCode);
            if ($scope.recitals.recitalCode == $scope.crc) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner><p style="color:azure">Recital Code CAN NOT be same as current code</p>',
                    duration: 3000
                });
            } else {
                $http.get(baseURL + 'recitals/' + $scope.recitals.recitalCode)
                    .success(function (recital) {
                        $localStorage.store(CURRENT_RECITAL_CODE, $scope.recitals.recitalCode);
                        clearStuff();
                        $location.path('/home');
                    })
                    .error(function (error) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon="android"></ion-spinner><p style="color:azure">Recital Code does not Exist</p>',
                            duration: 3000
                        });
                    });
            }
        };
        /**
            cancellation of the options menu forms just toggles some switches to hide forms and show the READ button
        */
        $scope.cancelRecitalEntry = function () {
            clearStuff();
            $location.path('/home');
        };
        var clearStuff = function () {
            console.log("clearing Stuff");
            $scope.recitals.recitalCode = "";
            $scope.recitals.recitalCodeConfirm = "";
            $scope.form.enterRecitalForm.$setPristine();
        };
        $scope.$on("$ionicView.afterLeave", function () {
            $ionicHistory.clearCache();
        });
    }])
    .controller('NewController', ['$scope', '$location', '$http', '$localStorage', 'codeGenerationService', 'baseURL', '$ionicLoading',
                        function ($scope, $location, $http, $localStorage, codeGenerationService, baseURL, $ionicLoading) {
            $scope.baseURL = baseURL;
            var CURRENT_RECITAL_CODE = "CurrentRecitalCode";
            $scope.pageSelected_1 = true;
            $scope.pageSelected_2 = false;
            $scope.pageSelected_5 = false;
            $scope.newCodeData = {      // ==== this is for the new code generation form ===
                pages: 1,
                fatiha: false,
                emailid: "",
                emailidconfirm: "",
                generatedCode: ""
            };
            $scope.form = {};
            $scope.pageSelect1 = function(){
              $scope.newCodeData.pages=1;
              $scope.pageSelected_2 = false;
              $scope.pageSelected_5 = false;
            };
            $scope.pageSelect2 = function(){
              $scope.newCodeData.pages=2;
              $scope.pageSelected_1 = false;
              $scope.pageSelected_5 = false;
            };
            $scope.pageSelect5 = function(){
              $scope.newCodeData.pages=5;
              $scope.pageSelected_2 = false;
              $scope.pageSelected_1 = false;
            };
            $scope.RecitalGeneration = function () {
                $scope.showSpinner = true;
                $scope.newCodeData.generatedCode = codeGenerationService.codeGen();
                console.log($scope.newCodeData);
                $ionicLoading.show();
                $http.post(baseURL+'recitals/newcode', $scope.newCodeData)
                        .success(function (recital) {
                            $localStorage.store(CURRENT_RECITAL_CODE, $scope.newCodeData.generatedCode);
                            clearStuff();
                            $ionicLoading.hide();
                            $location.path('/home');
                        })
                        .error(function (error) {
                            $ionicLoading.show({
                                template: '<ion-spinner icon="android"></ion-spinner><p style="color:azure">Service Not Available-Please try latetr</p>',
                                duration: 3000
                            });
                        });
            };
            $scope.cancelRecitalGeneration = function () {
                clearStuff();
                $location.path('/home');
            };
            var clearStuff = function () {
                $scope.newCodeData.pages = 1;
                $scope.newCodeData.fatiha = false;
                $scope.newCodeData.emailid = "";
                $scope.newCodeData.emailidconfirm = "";
                $scope.newCodeData.generatedCode = "";
                $scope.form.generateRecitalForm.$setPristine();
            };
        }])
;
