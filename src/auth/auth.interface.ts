type KakaoUser = {
  email: string;
  nickname: string;
};

export type KakaoRequest = Request & { user: KakaoUser };
