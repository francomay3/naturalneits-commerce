import { shopifyFetch } from "lib/shopify";
import { testQuery } from "lib/shopify/queries/product";

export default async function TestPage() {
  try {
    const res = await shopifyFetch({
      query: testQuery,
    });

    const products = res.body.data.products.edges.map((edge: any) => edge.node);

    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          Test Query Results
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "#666", fontSize: "18px" }}>
            Products Found: {products.length}
          </h2>
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          {products.map((product: any, index: number) => (
            <div
              key={product.handle}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {index + 1}. {product.handle}
              </h3>
              <p style={{ margin: "0", color: "#666" }}>
                Total Inventory: {product.totalInventory}
              </p>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p style={{ color: "#999", fontStyle: "italic" }}>
            No products found.
          </p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ color: "#d32f2f", marginBottom: "20px" }}>Error</h1>
        <p style={{ color: "#666" }}>
          Failed to fetch products:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
