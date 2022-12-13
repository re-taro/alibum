import type { UseFormRegister } from "react-hook-form";
import type { FC, FormEventHandler } from "react";
import { Input } from "../shared/form/input";
import type { CreateStoreMenuListItem } from "../../libs/firebase/store";

type MenuFormProps = {
  register: UseFormRegister<CreateStoreMenuListItem>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const MenuForm: FC<MenuFormProps> = ({ register, handleSubmit }) => (
  <form onSubmit={handleSubmit} id="menu">
    <Input {...register("name")} label="相手の名前" size="lg" placeholder="ありばむ太郎" />
    <Input {...register("date")} label="記念日" size="lg" placeholder="○月○日" />
    <Input {...register("title")} label="タイトル" size="lg" placeholder="" />
  </form>
);
