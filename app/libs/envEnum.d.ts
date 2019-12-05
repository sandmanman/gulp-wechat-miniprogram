declare enum EnvEnum {
  TEST,
  ONLINE
}

type envOption = keyof typeof EnvEnum
