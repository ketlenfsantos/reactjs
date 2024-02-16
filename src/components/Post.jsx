import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';
// o post precisa: as infos do author: { url do avatar: string, nome:"string", cargo:""}
//data de publicação : Date
//conteudo do post content:string
export function Post({ author, publishedAt, content }) {

    //use state retorna 1 arraycom 2 posições, retorna o comentário e o aviso
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
    ]);
    //novo estado
    const [newCommentText, setNewCommentText] = useState('');
    //forma de conversão de datas, numeros etc em JS, para o TITLE
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });
    // nova data relativa a data atual

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });
    //click novo comentario sem conteudo
    function handleCrateNewComment() {
        event.preventDefault()
        //adicionar uma nova função no array (comentário)
        setComments([...comments, newCommentText]);
        //(...) copia os valores q ja existem no comentários, new comment adiciona o comentário
        setNewCommentText(''); //deixa caixa de texto em branco novamente 
    }

    function handleNewCommentChange() {
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => { //percorre a array contida no app (o conteudo
                    if (line.type === 'paragraph') { //se acessar e for paragrafo, mostra o paragrafo
                        return <p key={line.content}>{line.content}</p>; //se for link, executa o link
                    } else if (line.type === 'link') { //se não, vai pro link
                        return <p key={line.content}><a href="#">{line.content}</a></p>

                    }
                })}
            </div>


            <form onSubmit={handleCrateNewComment} className={styles.commentForm}>


                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment" //comentario na caixa de texto
                    placeholder="Deixe um comentário" //mensagem fixa
                    value={newCommentText} //muda quando tiver um novo 
                    onChange={handleNewCommentChange}
                />

                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}

