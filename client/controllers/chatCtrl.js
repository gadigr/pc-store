app.controller('chatCtrl',['$scope', 'chatSocket', 'messageFormatter', 'nickName',
        function ($scope, chatSocket, messageFormatter, nickName) {
        $scope.nickName = nickName;
        $scope.messageLog = 'Ready to chat!';

        $scope.sendMessage = function() {
            var match = $scope.message.match('^\/nick (.*)');

            if (angular.isDefined(match) &&
                angular.isArray(match) && match.length === 2) {
                var oldNick = nickName;
                nickName = match[1];
                $scope.message = '';
                $scope.messageLog = messageFormatter(new Date(),
                        nickName, 'nickname changed - from ' +
                        oldNick + ' to ' + nickName + '!') +
                    $scope.messageLog;
                $scope.nickName = nickName;
            }

            chatSocket.emit('message', nickName, $scope.message);
            $scope.message = '';
        };

        $scope.$on('socket:broadcast', function(event, data) {
            if (!data.payload) {
                return;
            }
            $scope.$apply(function() {
                $scope.messageLog = messageFormatter(
                        new Date(), data.source,
                        data.payload) + $scope.messageLog;
            });
        });
    }]);