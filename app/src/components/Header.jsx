export default function Header() {

  return (
      <header>
        <div className="container-medium">
          <div className="area-options">
            <ul>
              <li className='option-active'>
                <a href="/">Início</a>
              </li>
              <li className='option-active'>
                <a href="/client-history">Historico de Clientes</a>
              </li>
              <li className='option-active'>
                <a href="/client">Clientes</a>
              </li>
              <li className='option-active'>
                <a href="/menu">Menu</a>
              </li>
              <li className='option-active'>
                <a href="/client-checkpad">Clientes com comanda aberta</a>
              </li>
              <li className='option-active'>
                <a href="/insert-item">Inserção de itens</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
  )
}