import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const ORDERS_API = "http://localhost:8081/api/v1/orders";
const PRODUCTS_API = "http://localhost:8080/api/v1/products";

export default function Reportes() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar órdenes + productos
  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch(ORDERS_API),
          fetch(PRODUCTS_API),
        ]);

        if (!ordersRes.ok || !productsRes.ok) {
          throw new Error("Error al cargar datos de reportes");
        }

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        setOrders(ordersData);
        setProducts(productsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ====== MÉTRICAS PRINCIPALES ======
  const metrics = useMemo(() => {
    const totalOrdenes = orders.length;
    const totalVentas = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );
    const ticketPromedio =
      totalOrdenes > 0 ? totalVentas / totalOrdenes : 0;

    // Productos más vendidos
    const contador = {};
    orders.forEach((o) => {
      o.items?.forEach((it) => {
        if (!contador[it.productName]) {
          contador[it.productName] = {
            name: it.productName,
            cantidad: 0,
            ingresos: 0,
          };
        }
        contador[it.productName].cantidad += it.quantity;
        contador[it.productName].ingresos +=
          (it.price || 0) * it.quantity;
      });
    });

    const topProductos = Object.values(contador)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    return { totalOrdenes, totalVentas, ticketPromedio, topProductos };
  }, [orders]);

  // ====== VENTAS POR DÍA (para gráfico de líneas) ======
  const ventasPorDia = useMemo(() => {
    const mapa = {};

    orders.forEach((o) => {
      if (!o.createdAt) return;
      const fecha = new Date(o.createdAt);
      if (Number.isNaN(fecha.getTime())) return;

      const key = fecha.toISOString().slice(0, 10); // YYYY-MM-DD

      if (!mapa[key]) {
        mapa[key] = { fecha: key, total: 0, ordenes: 0 };
      }
      mapa[key].total += o.total || 0;
      mapa[key].ordenes += 1;
    });

    return Object.values(mapa).sort((a, b) =>
      a.fecha.localeCompare(b.fecha)
    );
  }, [orders]);

  if (loading) return <p>Cargando reportes...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="adm-reportes">
      <h2 className="mb-2">📊 Reportes de Ventas</h2>
      <p className="text-muted mb-4">
        Resumen general de las órdenes, ventas y productos conectados a los
        microservicios.
      </p>

      {/* === KPIs === */}
      <div className="adm-kpis">
        <div className="adm-kpi adm-kpi-blue">
          <div className="adm-kpi-icon">
            <i className="bi bi-cart-check" />
          </div>
          <div>
            <div className="adm-kpi-title">Órdenes Totales</div>
            <div className="adm-kpi-value">
              {metrics.totalOrdenes.toLocaleString("es-CL")}
            </div>
          </div>
        </div>

        <div className="adm-kpi adm-kpi-green">
          <div className="adm-kpi-icon">
            <i className="bi bi-currency-dollar" />
          </div>
          <div>
            <div className="adm-kpi-title">Ventas Totales</div>
            <div className="adm-kpi-value">
              ${metrics.totalVentas.toLocaleString("es-CL")}
            </div>
          </div>
        </div>

        <div className="adm-kpi adm-kpi-yellow">
          <div className="adm-kpi-icon">
            <i className="bi bi-graph-up" />
          </div>
          <div>
            <div className="adm-kpi-title">Ticket Promedio</div>
            <div className="adm-kpi-value">
              ${Math.round(metrics.ticketPromedio).toLocaleString("es-CL")}
            </div>
          </div>
        </div>
      </div>

      {/* === TABLA TOP PRODUCTOS === */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Productos más vendidos</h5>
          <p className="text-muted">
            Basado en la cantidad vendida en todas las órdenes.
          </p>
          {metrics.topProductos.length === 0 ? (
            <p className="text-muted mb-0">
              Aún no hay suficientes datos de ventas.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad vendida</th>
                    <th>Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.topProductos.map((p) => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td>{p.cantidad}</td>
                      <td>${p.ingresos.toLocaleString("es-CL")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* === GRÁFICO: VENTAS POR PRODUCTO === */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Ventas por producto</h5>
          {metrics.topProductos.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={metrics.topProductos}
                margin={{ top: 5, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "Ingresos ($)") {
                      return `$${value.toLocaleString("es-CL")}`;
                    }
                    return value;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="ingresos"
                  name="Ingresos ($)"
                  fill="#0d6efd"
                />
                <Bar
                  dataKey="cantidad"
                  name="Cantidad"
                  fill="#ffc107"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted mb-0">
              No hay datos para mostrar el gráfico.
            </p>
          )}
        </div>
      </div>

      {/* === GRÁFICO: VENTAS POR DÍA === */}
      <div className="card mt-4 mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Evolución diaria de ventas</h5>
          <p className="text-muted">
            Muestra el total vendido por día según la fecha de creación de
            cada orden.
          </p>
          {ventasPorDia.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={ventasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    `$${value.toLocaleString("es-CL")}`
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total vendido"
                  stroke="#198754"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted mb-0">
              Aún no hay suficientes datos de fechas para graficar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
