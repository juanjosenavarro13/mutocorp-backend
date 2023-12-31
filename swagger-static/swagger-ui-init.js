
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/auth/register": {
        "post": {
          "operationId": "AuthController_signupLocal",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User register"
            },
            "400": {
              "description": "user already exists, passwords do not match or invalid data"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User logged in"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/refresh": {
        "get": {
          "operationId": "AuthController_refreshTokens",
          "parameters": [],
          "responses": {
            "200": {
              "description": "refresh token"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "parameters": [],
          "responses": {
            "200": {
              "description": "logout"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/users/profile": {
        "get": {
          "operationId": "UsersController_getProfile",
          "parameters": [],
          "responses": {
            "200": {
              "description": "refresh token"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "users"
          ]
        },
        "post": {
          "operationId": "UsersController_updateProfile",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateProfileDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "refresh token"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/api/raiders": {
        "get": {
          "operationId": "RaidersController_getRaiders",
          "parameters": [],
          "responses": {
            "200": {
              "description": "get all raiders"
            }
          },
          "tags": [
            "raiders"
          ]
        },
        "post": {
          "operationId": "RaidersController_createRaider",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRaiderDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "raider created"
            },
            "400": {
              "description": "user not found or raider exist"
            },
            "401": {
              "description": "UNAUTHORIZED"
            }
          },
          "tags": [
            "raiders"
          ]
        }
      },
      "/api/admin/users": {
        "get": {
          "operationId": "AdminController_getAllUsers",
          "parameters": [],
          "responses": {
            "200": {
              "description": "get all users"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Admin"
          ]
        }
      },
      "/api/admin/raiders": {
        "get": {
          "operationId": "AdminController_getAllRaiders",
          "parameters": [],
          "responses": {
            "200": {
              "description": "get all raiders"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Admin"
          ]
        }
      },
      "/api/admin/raiders/create": {
        "post": {
          "operationId": "AdminController_createRaider",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRaiderDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "create raider"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Admin"
          ]
        }
      }
    },
    "info": {
      "title": "MUTOCORP API",
      "description": "",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "RegisterDTO": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "John Doe"
            },
            "email": {
              "type": "string",
              "example": "john@doe.es"
            },
            "password": {
              "type": "string",
              "example": "123456"
            },
            "password_confirmation": {
              "type": "string",
              "example": "123456"
            }
          },
          "required": [
            "name",
            "email",
            "password",
            "password_confirmation"
          ]
        },
        "LoginDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "email@email.es"
            },
            "password": {
              "type": "string",
              "example": "123456"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "UpdateProfileDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "email@email.es"
            },
            "name": {
              "type": "string",
              "example": "pepito"
            }
          },
          "required": [
            "email",
            "name"
          ]
        },
        "CreateRaiderDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "pepito"
            },
            "hikoins": {
              "type": "string",
              "example": "123456",
              "default": 0
            },
            "user": {
              "type": "string",
              "example": "64b2b0bdaee38c32378b7ca5"
            }
          },
          "required": [
            "name",
            "user"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
