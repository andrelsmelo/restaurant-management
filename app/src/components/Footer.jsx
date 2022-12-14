export default function Footer() {
    return (
        <>
            <footer>
                <div className="container-medium">
                    <div className="content-footer">
                        <div className="col-footer">
                            <div className="category-footer">
                                <input type="radio" id="category-products" name="category-footer" />
                                <label htmlFor="category-products" className="title-category">Redes Sociais e Contatos</label>
                                <ul className="products-footer">
                                    <li key="555"><a href="/produtos?ura">Linkedin</a></li>
                                    <li key="333"><a href="/produtos?bot-voz">Github</a></li>
                                    <li key="111"><a href="/produtos?portais">Instagram</a></li>
                                    <li key="666"><a href="/produtos?bot-texto">Whatsapp</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="area-copyright">
                        <p>
                            Copyright 2022. Todos direitos reservados a André Melo.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}