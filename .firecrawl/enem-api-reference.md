> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.enem.dev/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.enem.dev/api-reference/provas/listar-provas#content-area)

[API ENEM home page![light logo](https://mintcdn.com/enemapi/ryXgQ95ScWB8_mAX/assets/light.svg?fit=max&auto=format&n=ryXgQ95ScWB8_mAX&q=85&s=523f3edb45964dffcb5c0f342cae4689)![dark logo](https://mintcdn.com/enemapi/ryXgQ95ScWB8_mAX/assets/dark.svg?fit=max&auto=format&n=ryXgQ95ScWB8_mAX&q=85&s=f7951b35f44cde9ee37f2347207d2f13)](https://docs.enem.dev/)

Pesquisar...

Ctrl K

- [yunger7/enem-api\\
\\
349](https://github.com/yunger7/enem-api "yunger7/enem-api")
- [yunger7/enem-api\\
\\
349](https://github.com/yunger7/enem-api "yunger7/enem-api")

Search...

Navigation

Provas

Listar provas

[Documentation](https://docs.enem.dev/introduction) [API Reference](https://docs.enem.dev/api-reference/provas/listar-provas)

- [Home](https://enem.dev/)
- [GitHub](https://github.com/yunger7/enem-api)

### Provas

- [GET\\
\\
Listar provas](https://docs.enem.dev/api-reference/provas/listar-provas)
- [GET\\
\\
Listar prova](https://docs.enem.dev/api-reference/provas/listar-prova)

### Questões

- [GET\\
\\
Listar questões](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es)
- [GET\\
\\
Listar questão](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%A3o)

Listar provas

cURL

```
curl --request GET \
  --url https://api.enem.dev/v1/exams
```

```
import requests

url = "https://api.enem.dev/v1/exams"

response = requests.get(url)

print(response.text)
```

```
const options = {method: 'GET'};

fetch('https://api.enem.dev/v1/exams', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [\
  CURLOPT_URL => "https://api.enem.dev/v1/exams",\
  CURLOPT_RETURNTRANSFER => true,\
  CURLOPT_ENCODING => "",\
  CURLOPT_MAXREDIRS => 10,\
  CURLOPT_TIMEOUT => 30,\
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\
  CURLOPT_CUSTOMREQUEST => "GET",\
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

```
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.enem.dev/v1/exams"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

```
HttpResponse<String> response = Unirest.get("https://api.enem.dev/v1/exams")
  .asString();
```

```
require 'uri'
require 'net/http'

url = URI("https://api.enem.dev/v1/exams")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

200

400

404

422

429

500

```
[\
  {\
    "title": "ENEM 2020",\
    "year": 2020,\
    "disciplines": [\
      {\
        "label": "Ciências Humanas e suas Tecnologias",\
        "value": "ciencias-humanas"\
      },\
      {\
        "label": "Ciências da Natureza e suas Tecnologias",\
        "value": "ciencias-natureza"\
      },\
      {\
        "label": "Linguagens, Códigos e suas Tecnologias",\
        "value": "linguagens"\
      },\
      {\
        "label": "Matemática e suas Tecnologias",\
        "value": "matematica"\
      }\
    ],\
    "languages": [\
      {\
        "label": "Espanhol",\
        "value": "espanhol"\
      },\
      {\
        "label": "Inglês",\
        "value": "ingles"\
      }\
    ]\
  }\
]
```

```
{
  "error": {
    "code": "bad_request",
    "message": "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
    "docUrl": "https://enem.dev/docs/errors#bad-request"
  }
}
```

```
{
  "error": {
    "code": "not_found",
    "message": "The server cannot find the requested resource.",
    "docUrl": "https://enem.dev/docs/errors#not-found"
  }
}
```

```
{
  "error": {
    "code": "unprocessable_entity",
    "message": "The request was well-formed but was unable to be followed due to semantic errors.",
    "docUrl": "https://enem.dev/docs/errors#unprocessable-entity"
  }
}
```

```
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "The user has sent too many requests in a given amount of time",
    "docUrl": "https://enem.dev/docs/errors#rate-limit_exceeded"
  }
}
```

```
{
  "error": {
    "code": "internal_server_error",
    "message": "The server has encountered a situation it does not know how to handle.",
    "docUrl": "https://enem.dev/docs/errors#internal-server_error"
  }
}
```

Provas

# Listar provas

Listar todas as provas disponíveis

GET

/

exams

Try it

Listar provas

cURL

```
curl --request GET \
  --url https://api.enem.dev/v1/exams
```

```
import requests

url = "https://api.enem.dev/v1/exams"

response = requests.get(url)

print(response.text)
```

```
const options = {method: 'GET'};

fetch('https://api.enem.dev/v1/exams', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [\
  CURLOPT_URL => "https://api.enem.dev/v1/exams",\
  CURLOPT_RETURNTRANSFER => true,\
  CURLOPT_ENCODING => "",\
  CURLOPT_MAXREDIRS => 10,\
  CURLOPT_TIMEOUT => 30,\
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\
  CURLOPT_CUSTOMREQUEST => "GET",\
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

```
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.enem.dev/v1/exams"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

```
HttpResponse<String> response = Unirest.get("https://api.enem.dev/v1/exams")
  .asString();
```

```
require 'uri'
require 'net/http'

url = URI("https://api.enem.dev/v1/exams")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

200

400

404

422

429

500

```
[\
  {\
    "title": "ENEM 2020",\
    "year": 2020,\
    "disciplines": [\
      {\
        "label": "Ciências Humanas e suas Tecnologias",\
        "value": "ciencias-humanas"\
      },\
      {\
        "label": "Ciências da Natureza e suas Tecnologias",\
        "value": "ciencias-natureza"\
      },\
      {\
        "label": "Linguagens, Códigos e suas Tecnologias",\
        "value": "linguagens"\
      },\
      {\
        "label": "Matemática e suas Tecnologias",\
        "value": "matematica"\
      }\
    ],\
    "languages": [\
      {\
        "label": "Espanhol",\
        "value": "espanhol"\
      },\
      {\
        "label": "Inglês",\
        "value": "ingles"\
      }\
    ]\
  }\
]
```

```
{
  "error": {
    "code": "bad_request",
    "message": "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
    "docUrl": "https://enem.dev/docs/errors#bad-request"
  }
}
```

```
{
  "error": {
    "code": "not_found",
    "message": "The server cannot find the requested resource.",
    "docUrl": "https://enem.dev/docs/errors#not-found"
  }
}
```

```
{
  "error": {
    "code": "unprocessable_entity",
    "message": "The request was well-formed but was unable to be followed due to semantic errors.",
    "docUrl": "https://enem.dev/docs/errors#unprocessable-entity"
  }
}
```

```
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "The user has sent too many requests in a given amount of time",
    "docUrl": "https://enem.dev/docs/errors#rate-limit_exceeded"
  }
}
```

```
{
  "error": {
    "code": "internal_server_error",
    "message": "The server has encountered a situation it does not know how to handle.",
    "docUrl": "https://enem.dev/docs/errors#internal-server_error"
  }
}
```

#### Response

200

application/json

Lista de provas

[​](https://docs.enem.dev/api-reference/provas/listar-provas#response-items-title)

title

string

required

O título da prova

Example:

`"ENEM 2020"`

[​](https://docs.enem.dev/api-reference/provas/listar-provas#response-items-year)

year

integer

required

O ano em que a prova foi aplicada

Required range: `x > 0`

Example:

`2020`

[​](https://docs.enem.dev/api-reference/provas/listar-provas#response-items-disciplines)

disciplines

object\[\]

required

As disciplinas da prova

Showchild attributes

Example:

```
[\
  {\
    "label": "Ciências Humanas e suas Tecnologias",\
    "value": "ciencias-humanas"\
  },\
  {\
    "label": "Ciências da Natureza e suas Tecnologias",\
    "value": "ciencias-natureza"\
  },\
  {\
    "label": "Linguagens, Códigos e suas Tecnologias",\
    "value": "linguagens"\
  },\
  {\
    "label": "Matemática e suas Tecnologias",\
    "value": "matematica"\
  }\
]
```

[​](https://docs.enem.dev/api-reference/provas/listar-provas#response-items-languages)

languages

object\[\]

required

Os idiomas da prova

Showchild attributes

Example:

```
[\
  { "label": "Espanhol", "value": "espanhol" },\
  { "label": "Inglês", "value": "ingles" }\
]
```

Was this page helpful?

YesNo

[Suggest edits](https://github.com/yunger7/enem-api/edit/main/docs/api-reference/provas/listar-provas.mdx) [Raise issue](https://github.com/yunger7/enem-api/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/provas/listar-provas)

[Listar prova](https://docs.enem.dev/api-reference/provas/listar-prova)

[github](https://github.com/yunger7/enem-api) [website](https://enem.dev/)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=enemapi)