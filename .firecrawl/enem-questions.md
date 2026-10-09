> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.enem.dev/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#content-area)

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

Questões

Listar questões

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

Listar questões

cURL

```
curl --request GET \
  --url 'https://api.enem.dev/v1/exams/{year}/questions?limit=10'
```

```
import requests

url = "https://api.enem.dev/v1/exams/{year}/questions?limit=10"

response = requests.get(url)

print(response.text)
```

```
const options = {method: 'GET'};

fetch('https://api.enem.dev/v1/exams/{year}/questions?limit=10', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [\
  CURLOPT_URL => "https://api.enem.dev/v1/exams/{year}/questions?limit=10",\
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

	url := "https://api.enem.dev/v1/exams/{year}/questions?limit=10"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

```
HttpResponse<String> response = Unirest.get("https://api.enem.dev/v1/exams/{year}/questions?limit=10")
  .asString();
```

```
require 'uri'
require 'net/http'

url = URI("https://api.enem.dev/v1/exams/{year}/questions?limit=10")

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
{
  "metadata": {
    "limit": 10,
    "offset": 0,
    "total": 180,
    "hasMore": true
  },
  "questions": [\
    {\
      "title": "Questão 1 - ENEM 2020",\
      "index": 1,\
      "discipline": "linguagens",\
      "language": "ingles",\
      "year": 2020,\
      "context": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",\
      "files": [\
        "https://enem.dev/2020/questions/1-ingles/6e1ca12e-9bc4-472b-8809-84e7e394714a.png"\
      ],\
      "correctAlternative": "A",\
      "alternativesIntroduction": "Com base no texto, selecione a alternativa correta",\
      "alternatives": [\
        {\
          "letter": "A",\
          "text": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",\
          "file": "https://enem.dev/2020/questions/1-ingles/6e1ca12e-9bc4-472b-8809-84e7e394714a.png",\
          "isCorrect": true\
        }\
      ]\
    }\
  ]
}
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

Questões

# Listar questões

Listar questões de uma prova por seu ano

GET

/

exams

/

{year}

/

questions

Try it

Listar questões

cURL

```
curl --request GET \
  --url 'https://api.enem.dev/v1/exams/{year}/questions?limit=10'
```

```
import requests

url = "https://api.enem.dev/v1/exams/{year}/questions?limit=10"

response = requests.get(url)

print(response.text)
```

```
const options = {method: 'GET'};

fetch('https://api.enem.dev/v1/exams/{year}/questions?limit=10', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [\
  CURLOPT_URL => "https://api.enem.dev/v1/exams/{year}/questions?limit=10",\
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

	url := "https://api.enem.dev/v1/exams/{year}/questions?limit=10"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

```
HttpResponse<String> response = Unirest.get("https://api.enem.dev/v1/exams/{year}/questions?limit=10")
  .asString();
```

```
require 'uri'
require 'net/http'

url = URI("https://api.enem.dev/v1/exams/{year}/questions?limit=10")

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
{
  "metadata": {
    "limit": 10,
    "offset": 0,
    "total": 180,
    "hasMore": true
  },
  "questions": [\
    {\
      "title": "Questão 1 - ENEM 2020",\
      "index": 1,\
      "discipline": "linguagens",\
      "language": "ingles",\
      "year": 2020,\
      "context": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",\
      "files": [\
        "https://enem.dev/2020/questions/1-ingles/6e1ca12e-9bc4-472b-8809-84e7e394714a.png"\
      ],\
      "correctAlternative": "A",\
      "alternativesIntroduction": "Com base no texto, selecione a alternativa correta",\
      "alternatives": [\
        {\
          "letter": "A",\
          "text": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",\
          "file": "https://enem.dev/2020/questions/1-ingles/6e1ca12e-9bc4-472b-8809-84e7e394714a.png",\
          "isCorrect": true\
        }\
      ]\
    }\
  ]
}
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

#### Path Parameters

[​](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#parameter-year)

year

string

required

O ano em que a prova foi aplicada

Example:

`"2020"`

#### Query Parameters

[​](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#parameter-limit)

limit

integer

default:10

O número máximo de questões a serem retornadas

Required range: `x > 0`

Example:

`10`

[​](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#parameter-offset)

offset

integer

default:0

O numero da primeira questão a ser retornada

Required range: `x >= 0`

Example:

`0`

[​](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#parameter-language)

language

string

O idioma desejado das questões

Example:

`"ingles"`

#### Response

200

application/json

Lista de questões

[​](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#response-metadata)

metadata

object

required

Showchild attributes

[​](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es#response-questions)

questions

Detalhes da questão · object\[\]

required

As questões da prova

Showchild attributes

Was this page helpful?

YesNo

[Suggest edits](https://github.com/yunger7/enem-api/edit/main/docs/api-reference/quest%C3%B5es/listar-quest%C3%B5es.mdx) [Raise issue](https://github.com/yunger7/enem-api/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/quest%C3%B5es/listar-quest%C3%B5es)

[Listar prova](https://docs.enem.dev/api-reference/provas/listar-prova) [Listar questão](https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%A3o)

[github](https://github.com/yunger7/enem-api) [website](https://enem.dev/)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=enemapi)