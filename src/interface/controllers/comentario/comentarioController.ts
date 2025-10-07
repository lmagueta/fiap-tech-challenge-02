import { Request, Response } from "express";
import { z } from "zod";
import { makeFindComentarioUseCase } from "../../../application/use-cases/factory/make-find-comentario-use-case";
import { Comentario } from "../../../domain/entities/comentario.entity";
import { makeCreateComentarioUseCase } from "../../../application/use-cases/factory/make-create-comentario-use-case";
import { makeUpdateComentarioUseCase } from "../../../application/use-cases/factory/make-update-comentario-use-case";
import { makeDeleteComentarioUseCase } from "../../../application/use-cases/factory/make-delete-comentario-use-case";


export async function findComentario(req: Request, res: Response) {
        console.log('req.params:', req.params);

    const registerParamsSchema = z.object({
        postId: z.coerce.number()
    });

    const { postId } = registerParamsSchema.parse(req.params);

    const findComentarioUseCase = makeFindComentarioUseCase();

    const post = await findComentarioUseCase.handler(postId);

    return res.status(200).send(post);
}


export async function createComentario(req: Request, res: Response) {
    const registerBodySchema = z.object({
        comentarioId: z.string().optional(),
        postId: z.object({
            postId: z.coerce.number(),
            titulo: z.string(),
            conteudo: z.string(),
            disciplinaId: z.object({
                disciplinaId: z.coerce.number(),
                nome: z.string()
            }),
            autorId: z.object({
                userId: z.coerce.number(),
                nome: z.string(),
                email: z.string(),
                senha: z.string(),
                cargo: z.object({
                    cargoId: z.coerce.number(),
                    tipo: z.string()
                })
            })
        }),
        autorId: z.object({
            userId: z.coerce.number(),
            nome: z.string(),
            email: z.string(), 
            senha: z.string(), 
            cargo: z.object({
                cargoId: z.coerce.number(),
                tipo: z.string()
            })
        }),
        conteudo: z.string()
    });

    const { comentarioId, postId, autorId, conteudo } = registerBodySchema.parse(req.body);
    
    const postIdWithDates = {
        ...postId,
        dtCriacao: new Date(),
        dtAtualizacao: new Date()
    };
    const createComentarioUseCase = makeCreateComentarioUseCase();

    const comentario = await createComentarioUseCase.handler({
        postId: postIdWithDates,
        autorId,
        conteudo,
        dtCriacao: new Date(),
        dtAtualizacao: new Date()
    });
    
    return res.status(201).send(comentario);
}

export async function updateComentario(req: Request, res: Response) {
    const registerParamsSchema = z.object({
        comentarioId: z.coerce.number()
    });

    const { comentarioId } = registerParamsSchema.parse(req.params);
    
    const registerBodySchema = z.object({
        comentarioId: z.string().optional(),
        postId: z.object({
            postId: z.coerce.number(),
            titulo: z.string(),
            conteudo: z.string(),
            disciplinaId: z.object({
                disciplinaId: z.coerce.number(),
                nome: z.string()
            }),
            autorId: z.object({
                userId: z.coerce.number(),
                nome: z.string(),
                email: z.string(),
                senha: z.string(),
                cargo: z.object({
                    cargoId: z.coerce.number(),
                    tipo: z.string()
                })
            }),
            dtAtualizacao: z.coerce.date(),
            dtCriacao: z.coerce.date()
        }),
        autorId: z.object({
            userId: z.coerce.number(),
            nome: z.string(),
            email: z.string(), 
            senha: z.string(), 
            cargo: z.object({
                cargoId: z.coerce.number(),
                tipo: z.string()
            })
        }),
        conteudo: z.string()
    });

    const { postId, autorId, conteudo } = registerBodySchema.parse(req.body);

    const updateComentarioUseCase = makeUpdateComentarioUseCase();

    const comentario = await updateComentarioUseCase.handler({
        comentarioId,
        postId,
        autorId,
        conteudo,
        dtAtualizacao: new Date(),
        dtCriacao: new Date()
    });


    return res.status(200).send(comentario);
}


export async function deleteComentario(req: Request, res: Response) {
    const registerParamsSchema = z.object({
        comentarioId: z.coerce.number()
    });

    const { comentarioId } = registerParamsSchema.parse(req.params);

    const deleteComentarioUseCase = makeDeleteComentarioUseCase();

    await deleteComentarioUseCase.handler(comentarioId);

    return res.status(204).send();
}