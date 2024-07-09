# Golden Raspberry Awards

## Descrição
O projeto foi desenvolvido usando Angular 18v

## Ferramentas e tecnologias
A versão do node utilizada no projeto foi a 20.15.0 (versão recomendada para testes locais)<br>
Docker para conteinerização <br>
nginx para configuração de rotas no servidor (ver arquivo nginx.conf)

## Como rodar?
### Docker 

na raiz do projeto onde se encontra o Dockerfile rodar os seguintes comandos:<br><br>

docker build -t golden-raspberry-awards .<br>
docker run -d -p 80:80 golden-raspberry-awards

### Localmente

Basta rodar:<br>
ng serve

## Testes unitários

Para os testes unitários foi utilizado Jasmine. <br>
Para rodar os testes basta rodar:<br>
ng test
