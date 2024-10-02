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
          "id" : "hero",
          "type": "Container",
          "styling": {
          "background": "url(https://upload.wikimedia.org/wikipedia/commons/c/ca/New_Bern_Historic_District.JPG)",
          "background-size": "cover",
          "background-position": "center",
        
          "height": "100vh"
          },
          "elements": [
            {
              "type": "Container",
              "text": "",
              "styling": {
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "flex-start",
                "height": "100%",
                "width": "100%",
                "background": "rgba(0,0,0,0.7)"
              },
              "elements": [
                {
                  "type": "Container",
                  "styling": {
                    "display": "flex",
                    "justify-content": "flex-start",
                    "width": "100%",
                    "height": "60px",
                    
                    
                  },
                  "elements": [
                    {
                      "type": "P",
                      "text": "Dream Friday",
                      "link": "/",
                      "styling": {
                        "color": "white",
                        "text-decoration": "none",
                        "font-weight": "bold",
                        "font-size": "20px",
                        "margin": "0px 20px"
                      },
                      "elements": []
                    }
                  ]
                },
                {
                  "type": "Container",
                  "styling": {
                    "display": "flex",
                    "flex-direction": "column",
                    "max-width": "600px",
                    "align-items": "flex-start",
                    "margin-top" : "15vh",
                    "padding" : "0px 20px",
                  
                  },
                  "elements": [
                    {
                      "type": "H1",
                      "text": "Simple Is Better",
                      "styling": {
                        "color": "white",
                        "font-size": "77px",
                        "line-height": "1.1"
                      }
                    },
                    {
                      "type": "P",
                      "text": "Founded in New Bern, NC, we built a platform from the ground up to power ultra low-cost custom websites for growing businesses in our town and beyond. We call them micro frontends.",
                      "styling": {
                        "margin-top": "20px",
                        "color": "white",
                        "font-size": "18px"
                      }
                    },
                    {
                      "type": "P",
                      "text": "Tiny sites. Big Impact.",
                      "styling": {
                        "margin-top": "18px",
                        "color": "white",
                        "font-size": "18px"
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
  
    "headerX": [
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
  