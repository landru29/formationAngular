'use strict';

zenContactApp.controller('ContactListController', [
		'$scope',
		'contactService',
		'Contact',
		function($scope, contactService, Contact) {
			$scope.contacts = Contact.query();

			$scope.nameFilter = function(contact) {
				if (!$scope.search) {
					return true;
				}
				return contact.firstName.match(new RegExp($scope.search, "i"))
						|| contact.lastName
								.match(new RegExp($scope.search, "i"));
			}

		} ]);

zenContactApp.controller('ContactEditController', [
		'$scope',
		'$http',
		'contactService',
		'$routeParams',
		'$location',
		'Contact',
		function($scope, $http, contactService, $routeParams, $location,
				Contact) {
			if ($routeParams.id) {
				$scope.contact = Contact.get({
					id : $routeParams.id
				});
			} else {
				$scope.contact = new Contact();
			}

			$scope.saveContact = function(contact) {
				if (contact.id) {
					contact.$update(function() {
						$location.path("/list");
					});
				} else {
					Contact.save(contact, function() {
						$location.path("/list");
					});
				}
			}
		} ]);
