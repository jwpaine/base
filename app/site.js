const siteData = {
    "meta" : {
      "domainName": "dreamfriday.com",
      "vid": "1234567",
      "siteName": "Base Store",
      "title": "Base Store",
    },
    "theme": {
        "colors": {
          "primary": "green",
          "secondary": "blue"
        }
    },
    "pages": {
      "home": [
        {
          "type": "Container",
          "styling": {
          "background": "url(https://plus.unsplash.com/premium_photo-1667338341609-829a2fb99bfc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          "background-size": "cover",
          "background-position": "center",
          "width": "100%",
            "height": "500px"
          },
          "elements": [
            {
              "type": "Container",
              "text": "",
              "styling": {
                "display": "flex",
                "flex-direction": "column",
                "align-items": "center",
                "height": "100%",
                "width": "100%",
                "background": "rgba(0,0,0,0.7)"
              },
              "elements": [
                {
                  "type": "Container",
                  "styling": {
                    "display": "flex",
                    "flex-direction": "column",
                    "max-width": "600px",
                    "align-items": "flex-start",
                    "padding": "0px 20px 0px 20px",
                    "position": "relative",
                    "bottom": "100px"
                  },
                  "elements": [
                    {
                      "type": "H1",
                      "text": "Simple Is Better",
                      "styling": {
                        "color": "white"
                      }
                    },
                    {
                      "type": "P",
                      "text": "We built a platform from the ground up to power ultra low-cost custom …",
                      "styling": {
                        "margin-top": "10px",
                        "color": "white"
                      }
                    },
                    {
                      "type": "P",
                      "text": "Tiny sites. Big Impact.",
                      "styling": {
                        "margin-top": "18px",
                        "color": "white"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    },
  
    "header": [
        {
          "type": "Container",
          "styling": {
            "display": "flex",
            "justify-content": "flex-start",
            "background": "white",
            "width": "100%",
            "height": "60px",
            "padding": "0px 10px 0px 10px"
          },
          "elements": [
            {
              "type": "P",
              "text": "Dream Friday",
              "link": "/",
              "styling": {
                "color": "black",
                "text-decoration": "none",
                "font-weight": "bold"
              },
              "elements": []
            }
          ]
        }
      ]
  }

  export default siteData;
  