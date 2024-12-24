# Ejecución de Pruebas

Este proyecto permite ejecutar pruebas automatizadas utilizando `cucumber-js`. A continuación, se describen los pasos necesarios y los ambientes disponibles para la ejecución.

## Comando de Ejecución

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
#Se hizo uso de tag para ejecuciones por separado
npx cross-env NODE_ENV=dev cucumber-js --tags @Add-visit
```

```bash
 npm run report
 start report/cucumber_report.html
```

Se realizo uso de esperas explicitas:

```bash
await page.waitForTimeout(3000);
```

## Ambiente

- uat = .env.uat
- dev = .env.dev

## Evidencias de ejecuciones

Estas evidencias se encuentran por cada carpeta Caso01 hasta Caso06, en ellas se encuentran las imagenes que tomó la ejecucion.

## Intalacion

```bash
- npm i @cucumber/cucumber -D
- npm i ts-node -D
```
