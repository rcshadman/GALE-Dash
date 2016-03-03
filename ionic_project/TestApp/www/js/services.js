angular.module('starter.services', [])
.factory('webService', ['$http', '$window','$q','$state', function ($http, $window,$q,$state) {
    var serviceToken, serviceHost, tokenKey,projectToken,projectKey,project;
    var projectList = null;
    projectKey = 'project';
    tokenKey = 'token';
    var dashData = {};

    
    if (localStorage.getItem(tokenKey)) {
        serviceToken = $window.localStorage.getItem(tokenKey);
    }
	
    
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
 
    return {
        setHost: function (host) {
            serviceHost = host;
        },
 
        setToken: function (token) {
            serviceToken = token;
            $window.localStorage.setItem(tokenKey, token);
        },
 
        getToken: function () {
        	return serviceToken;
        },
 
        removeToken: function() {
            serviceToken = undefined;
            $window.localStorage.removeItem(tokenKey);
        },
 
        get: function (uri, params) {
            params = params || {};
            params['_token'] = serviceToken;
            return $http.get(serviceHost + uri, {params: params});
        },
 
        post: function (uri, params) {
            params = params || {};
            params['_token'] = serviceToken;
       //     	var dfd = $q.defer()
	      // 	setTimeout(function() {
	      // 	dfd.resolve(
       //     	 	[{
       //  		"token": "shadman.alam",
       //  		"projects": [
       //      {
       //          "id": "12908",
       //          "name": "10017 HAIN Ella's Kitchen"
       //      },
       //      {
       //          "id": "13002",
       //          "name": "10103 BMO AEM Sales Journey"
       //      },
       //      {
       //          "id": "12502",
       //          "name": "10152 GALE Unchained Commerce"
       //      },
       //      {
       //          "id": "12600",
       //          "name": "10152 GALE Unchained Loyalty"
       //      },
       //      {
       //          "id": "12900",
       //          "name": "10153 HAIN Empire Kosher"
       //      },
       //      {
       //          "id": "12906",
       //          "name": "10153 HAIN Freebird"
       //      },
       //      {
       //          "id": "12903",
       //          "name": "10153 HAIN Plainville Farms"
       //      },
       //      {
       //          "id": "13000",
       //          "name": "10157 HAIN Earth's Best Retainer"
       //      },
       //      {
       //          "id": "12907",
       //          "name": "10159 HAIN Blue Print Retainer"
       //      },
       //      {
       //          "id": "12910",
       //          "name": "10173 BMO Digital Needs Notepad"
       //      },
       //      {
       //          "id": "13501",
       //          "name": "10181 BMO TPS Electronic Setup Forms Func & Tech Design"
       //      },
       //      {
       //          "id": "13401",
       //          "name": "10201 Whoosh Ongoing Media"
       //      },
       //      {
       //          "id": "13200",
       //          "name": "10202 CFNA Merchant Application System"
       //      },
       //      {
       //          "id": "13100",
       //          "name": "10204 HAIN Earth's Best New Site Build"
       //      },
       //      {
       //          "id": "12902",
       //          "name": "10205 HAIN Sensible Portions"
       //      },
       //      {
       //          "id": "13400",
       //          "name": "10220 Mackenzie Investments - Cluster Based Leads P1"
       //      },
       //      {
       //          "id": "12905",
       //          "name": "10255 HAIN Yves"
       //      },
       //      {
       //          "id": "12800",
       //          "name": "10274 HAIN Avalon"
       //      },
       //      {
       //          "id": "12904",
       //          "name": "10275 HAIN Imagine Soups"
       //      },
       //      {
       //          "id": "13300",
       //          "name": "10281 Mackenzie Fund Visualizer"
       //      },
       //      {
       //          "id": "13502",
       //          "name": "10293 HAIN Live Clean Site"
       //      },
       //      {
       //          "id": "13201",
       //          "name": "10299 GALE Internal Projects"
       //      },
       //      {
       //          "id": "13600",
       //          "name": "10301 - Celestial Seasonings"
       //      },
       //      {
       //          "id": "13301",
       //          "name": "10305 HAIN Blue Print Build"
       //      },
       //      {
       //          "id": "13402",
       //          "name": "10310 GDI User Testing"
       //      },
       //      {
       //          "id": "13202",
       //          "name": "BMO Digital Needs NotepadExt"
       //      },
       //      {
       //          "id": "13503",
       //          "name": "BMOCommercial"
       //      },
       //      {
       //          "id": "12700",
       //          "name": "Easy Financial BAU"
       //      },
       //      {
       //          "id": "12909",
       //          "name": "GALE PMO"
       //      },
       //      {
       //          "id": "13601",
       //          "name": "GALE Recognition Tool"
       //      },
       //      {
       //          "id": "13500",
       //          "name": "HAIN Avalon Ext"
       //      }
       //  			]
       // 			}] 
     		// );
     		//  },1000);
     		// return dfd.promise
           	return $http.post(serviceHost + uri,params);


        },
        setProject: function (token) {
            //project = token;
            $window.localStorage.setItem(projectKey, token);
        },
        setProjectList: function (projects) {
            projectList = projects;
            //$window.localStorage.setItem(projectKey, token);
        },
        getProject: function () {
        	
        	p = $window.localStorage.getItem(projectKey)
        	angular.forEach(projectList,function(proj,key) {
	        if (proj.id == p)
	        { 
	          return proj;
	        }
	       })

        	// return $window.localStorage.getItem(projectKey);
        },
        removeProject: function() {
        	project = null;
            projectToken = undefined;
            $window.localStorage.removeItem(projectKey);
        },
        getProjectList: function(){
        	
        	return projectList;
        },
        isProjectSet: function(){
	    	p = $window.localStorage.getItem(projectKey)
	    	if(p !==null && p !== undefined)
	    		return true;
	    	else
	    		return false;
	    },
	    setProjectData: function(projectId) {
	   //    var dfd = $q.defer()
	   //    setTimeout(function() {
	   //    	dfd.resolve(
	   //    		[ 
	   //    		{
    //     "issues_data": {
    //         "resolved": 2,
    //         "total": 3,
    //         "issues": [
    //             {
    //                 "status": "In Progress",
    //                 "assigne": {
    //                     "name": "andrew.kumar",
    //                     "key": "andrew.kumar"
    //                 },
    //                 "id": "19278",
    //                 "key": "HCELK-3",
    //                 "created": "2015-12-21T16:36:34.000-0500"
    //             },
    //             {
    //                 "status": "Delivered",
    //                 "assigne": {
    //                     "name": "andrew.kumar",
    //                     "key": "andrew.kumar"
    //                 },
    //                 "id": "18543",
    //                 "key": "HCELK-2",
    //                 "created": "2015-12-10T14:54:53.000-0500"
    //             },
    //             {
    //                 "status": "Delivered",
    //                 "assigne": {
    //                     "name": "cworthington",
    //                     "key": "cworthington"
    //                 },
    //                 "id": "14491",
    //                 "key": "HCELK-1",
    //                 "created": "2015-06-18T09:05:06.000-0400"
    //             }
    //         ],
    //         "unresolved": 1
    //     },
    //     "user_data": {
    //         "andrew.kumar": {
    //             "resolved": 1,
    //             "unresolved": 1,
    //             "name": "andrew.kumar"
    //         },
    //         "cworthington": {
    //             "resolved": 1,
    //             "unresolved": 0,
    //             "name": "cworthington"
    //         }
    //     },
    //     "project_versions": [],
    //     "project_info": {"name":"10017 HAIN Ella's Kitchen","id":"12908"}


    // }
    // ]

	   //    		);
    //  		 },1000)
	      $http.get(serviceHost+ 'api/'+ projectId+'/data?username='+serviceToken)
     		// return dfd
     		// console.log(dfd.promise);
	      //  dfd.promise.then(function(response){
	       	.success(function(response){
		        
		        dashData.open = response[0].issues_data.unresolved;
		        dashData.fixed = response[0].issues_data.resolved;
		        dashData.name = response[0].project_info.name;

		        angular.forEach(response[0].project_versions,function(version,key){
		            if(version.release_date !== null)
		            {
		                dashData.daysToLive = version.release_date;
		                dashData.version = version.name;
		            }
		        });
        	 dashData.ticketList = response[0].user_data;
        	 dashData.response = response;
        	 console.log(dashData);
	       	$state.go('tab.dashboard',{projectId:projectId});
        	 
     		})
	       
	   
		},
		getProjectData: function() {
			return dashData;
		},

    };
}])

.factory('graphService', ['$q', '$window', function ($q, $window) {
    return {}
}])
.factory('base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});



// .factory('auth', ['base64', '$cookies', '$http', function (base64, $cookies, $http) {
//     // initialize to whatever is in the cookie, if anything
//     $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('authdata');
 
//     return {
//         setCredentials: function (username, password) {
//             var encoded = base64.encode(username + ':' + password);
//             $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
//             $cookies.put('authdata', encoded);
//         },
//         clearCredentials: function () {
//             document.execCommand("ClearAuthenticationCache");
//             $cookies.remove('authdata');
//             $http.defaults.headers.common.Authorization = 'Basic ';
//         }
//     };
// }]);



