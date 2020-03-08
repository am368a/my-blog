import { addComment, getArticle, upvoteArticle } from "./services";

export const register = app => {
    /**
     * Fetch an article by name
     */
    app.get( "/api/article/:name", getArticle );

    /**
     * Upvote an article
     */
    app.post( "/api/article/:name/upvote", upvoteArticle );

    /**
     * Add comments to an article
     */
    app.post( "/api/article/:name/add-comment", addComment );
};
