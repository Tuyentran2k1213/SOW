// PriceList.tsx
import React, { useEffect, useState, useRef } from 'react';
import { api } from '../../services/api';
import { Product } from '../../types';
import './style.css'

export const PriceList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState<{id: number, field: string} | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCellEdit = (id: number, field: string, value: string | number) => {
    // Update local state immediately
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce API call
    timeoutRef.current = setTimeout(async () => {
      try {
        await api.updateProduct(id, { [field]: value });
      } catch (error) {
        console.error('Failed to update product:', error);
        // Reload products on error
        loadProducts();
      }
    }, 500);
  };

  const handleCellClick = (id: number, field: string) => {
    setEditingCell({ id, field });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const parseNumber = (str: string): number => {
    return parseFloat(str.replace(/,/g, '')) || 0;
  };

  return (
    <div className="pricelist-container">
      {/* Header */}
      <header className="pricelist-header">
        <div className="header-left">
          <button className="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="user-info">
            <div className="user-avatar">
              <span>JA</span>
            </div>
            <div className="user-details">
              <span className="user-name">John Andre</span>
              <span className="user-location">Starfjord AS</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span className="location">Norsk Bokmål</span>
          <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="Flag" className="flag" />
        </div>
      </header>

      {/* Desktop View */}
      <div className="desktop-view">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="menu">
            <h3>Menu</h3>
            <ul>
              <li><span className="icon">📋</span> Invoices</li>
              <li><span className="icon">👥</span> Customers</li>
              <li><span className="icon">💼</span> My Business</li>
              <li><span className="icon">📊</span> Invoice Journal</li>
              <li className="active"><span className="icon">💰</span> Price List</li>
              <li><span className="icon">📑</span> Multiple Invoicing</li>
              <li><span className="icon">📝</span> Unpaid Invoices</li>
              <li><span className="icon">🎁</span> Offer</li>
              <li><span className="icon">📦</span> Inventory Control</li>
              <li><span className="icon">👤</span> Member Invoicing</li>
              <li><span className="icon">📤</span> Import/Export</li>
              <li><span className="icon">🚪</span> Log out</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <input type="text" placeholder="Search Article No..." className="search-input" />
              <button className="search-button">🔍</button>
            </div>
            <div className="search-container">
              <input type="text" placeholder="Search Product..." className="search-input" />
              <button className="search-button">🔍</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-new">New Product ✅</button>
            <button className="btn btn-print">Print List 🖨️</button>
            <button className="btn btn-advanced">Advanced mode 🔧</button>
          </div>

          {/* Products Table */}
          <div className="table-container">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Article No. ↓</th>
                    <th>Product/Service ↓</th>
                    <th>In Price</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>In Stock</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className={product.id === 1 ? 'selected' : ''}>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'articleNo' ? (
                          <input
                            type="text"
                            value={product.articleNo}
                            onChange={(e) => handleCellEdit(product.id, 'articleNo', e.target.value)}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span onClick={() => handleCellClick(product.id, 'articleNo')}>
                            {product.articleNo}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'productService' ? (
                          <input
                            type="text"
                            value={product.productService}
                            onChange={(e) => handleCellEdit(product.id, 'productService', e.target.value)}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span 
                            onClick={() => handleCellClick(product.id, 'productService')}
                            className="product-name"
                          >
                            {product.productService}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'inPrice' ? (
                          <input
                            type="text"
                            value={product.inPrice}
                            onChange={(e) => handleCellEdit(product.id, 'inPrice', parseNumber(e.target.value))}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span onClick={() => handleCellClick(product.id, 'inPrice')}>
                            {formatNumber(product.inPrice)}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'price' ? (
                          <input
                            type="text"
                            value={product.price}
                            onChange={(e) => handleCellEdit(product.id, 'price', parseNumber(e.target.value))}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span onClick={() => handleCellClick(product.id, 'price')}>
                            {formatNumber(product.price)}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'unit' ? (
                          <input
                            type="text"
                            value={product.unit}
                            onChange={(e) => handleCellEdit(product.id, 'unit', e.target.value)}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span onClick={() => handleCellClick(product.id, 'unit')}>
                            {product.unit}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'inStock' ? (
                          <input
                            type="text"
                            value={product.inStock}
                            onChange={(e) => handleCellEdit(product.id, 'inStock', parseNumber(e.target.value))}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span onClick={() => handleCellClick(product.id, 'inStock')}>
                            {formatNumber(product.inStock)}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingCell?.id === product.id && editingCell?.field === 'description' ? (
                          <input
                            type="text"
                            value={product.description}
                            onChange={(e) => handleCellEdit(product.id, 'description', e.target.value)}
                            onBlur={handleCellBlur}
                            autoFocus
                            className="cell-input"
                          />
                        ) : (
                          <span 
                            onClick={() => handleCellClick(product.id, 'description')}
                            className="description"
                          >
                            {product.description}
                          </span>
                        )}
                      </td>
                      <td>
                        <button className="more-btn">⋯</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {/* Mobile View */}
      <div className="mobile-view">
        {/* Mobile Header */}
        <div className="mobile-header">
          <button className="hamburger-mobile">☰</button>
          <span className="mobile-title">Price List</span>
          <div className="mobile-lang">
            <span>English</span>
            <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="Flag" />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mobile-search">
          <input type="text" placeholder="Search Article No..." />
          <input type="text" placeholder="Search Product..." />
        </div>

        {/* Mobile Actions */}
        <div className="mobile-actions">
          <button className="mobile-btn add">➕</button>
          <button className="mobile-btn print">🖨️</button>
          <button className="mobile-btn more">⋯</button>
        </div>

        {/* Mobile Product List */}
        <div className="mobile-products">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="mobile-product-card">
                <div className="card-row">
                  <span className="label">Product/Service</span>
                  <input 
                    type="text" 
                    value={product.productService}
                    onChange={(e) => handleCellEdit(product.id, 'productService', e.target.value)}
                    className="mobile-input"
                  />
                </div>
                <div className="card-row">
                  <span className="label">Price</span>
                  <input 
                    type="text" 
                    value={formatNumber(product.price)}
                    onChange={(e) => handleCellEdit(product.id, 'price', parseNumber(e.target.value))}
                    className="mobile-input"
                  />
                </div>
                <button className="card-more">⋯</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};