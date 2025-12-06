export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3333";

export interface Category {
  id: string;
  nome: string;
}

export interface Product {
  id: string;
  nome: string;
  descricao?: string;
  preco: string;
  estoque?: number;
  categoriaId: string;
  categoria: Category;
}

export interface CreateProductDTO {
  nome: string;
  descricao?: string;
  preco: string;
  estoque?: number;
  categoriaId: string;
}

export interface User {
  id: string;
  email: string;
  nome?: string;
  userType?: "admin" | "cliente";
}

export interface UserUpdate {
  email?: string;
  nome?: string;
  password?: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegisterDTO {
  nome?: string;
  email: string;
  cpf: string;
  password: string;
  userType?: string;
}

export interface CreateCategoryDTO {
  nome: string;
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  productId: string;
  quantidade: number;
  precoUnitario: string;
  product?: Product;
}

export interface Purchase {
  purchaseId: string;
  userId: string;
  total: number;
  createdAt: string;
  items?: PurchaseItem[];
}

export interface CreatePurchaseDTO {
  userId: string;
  items: Array<{
    productId: string;
    quantidade: number;
  }>;
}

export interface CreatePurchaseResponse {
  message: string;
  total: number;
  purchaseId: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/api/products/list`, {
      credentials: "include",
    });
    return response.json();
  }

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${this.baseURL}/api/products/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar produto");
    return response.json();
  }

  async getProductsCard(): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/api/products/list-cards`);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return response.json();
  }

  async createProduct(data: CreateProductDTO) {
    const response = await fetch(`${this.baseURL}/api/products/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async updateProduct(id: string, data: Partial<CreateProductDTO>) {
    const response = await fetch(`${this.baseURL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar produto");
    }

    return response.json();
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erro ao deletar produto");
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseURL}/api/categories/list`);
    const data = await response.json();

    return data.result;
  }

  async getCategory(id: string): Promise<Category> {
    const response = await fetch(`${this.baseURL}/api/categories/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar categoria");
    return response.json();
  }

  async createCategory(nome: string): Promise<Category> {
    const response = await fetch(`${this.baseURL}/api/categories/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    if (!response.ok) throw new Error("Erro ao criar categoria");
    return response.json();
  }

  async updateCategory(id: string, nome: string): Promise<Category> {
    const response = await fetch(`${this.baseURL}/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar categoria");
    return response.json();
  }

  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar categoria");
  }

  // Auth
  async login(data: LoginDTO) {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async register(data: RegisterDTO): Promise<{ user: User; token: string }> {
    const payload = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      senha: data.password,
      userType: data.userType,
    };

    const response = await fetch(`${this.baseURL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(json.error || "Erro ao registrar usuário");
    }

    return json;
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao fazer logout");
  }

  async updateUser(data: UserUpdate) {
    console.log("📨 [API] updateUser() foi chamado com:", data);

    const response = await fetch(`${this.baseURL}/api/auth/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log("📨 [API] Body enviado para o backend:", JSON.stringify(data));

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.log("❌ [API] Erro recebido:", error);
      throw new Error(error.error || "Erro ao atualizar usuário");
    }

    const json = await response.json();
    console.log("🟢 [API] Resposta recebida:", json);

    return json;
  }

  // Purchases
  async createPurchase(
    data: CreatePurchaseDTO
  ): Promise<CreatePurchaseResponse> {
    const response = await fetch(`${this.baseURL}/api/purchases/sales`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Erro ao finalizar compra");
    }
    return response.json();
  }

  async getPurchaseHistory(userId: string) {
    const response = await fetch(
      `${this.baseURL}/api/purchases/history/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar histórico");
    }

    return response.json();
  }
}

export const api = new ApiService();
