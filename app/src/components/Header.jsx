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
                <a href="/checkpad">Comandas</a>
              </li>
              <li className='option-active'>
                <a href="/client-history">Historico de Clientes</a>
              </li>
              <li className='option-active'>
                <a href="/client">Novos Clientes</a>
              </li>
              <li className='option-active'>
                <a href="/menu">Menu</a>
              </li>
              <li className='option-active'>
                <a href="/client-checkpad">Clientes com comanda aberta</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
  )
}