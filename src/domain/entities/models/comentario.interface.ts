import { IPost } from "./post.interface";
import { IUsuario } from "./usuario.interface";

export interface IComentario {
    comentarioId?: number;
    postId: IPost;
    autorId: IUsuario;
    conteudo: string;
    dtCriacao: Date;
    dtAtualizacao: Date;
}
