export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      goals: {
        Row: {
          complete: boolean
          created_at: string
          description: string | null
          duration: Database["public"]["Enums"]["goal_duration"]
          growth_framework: number
          id: number
          title: string
          updated_at: string
          user: string
        }
        Insert: {
          complete?: boolean
          created_at?: string
          description?: string | null
          duration: Database["public"]["Enums"]["goal_duration"]
          growth_framework: number
          id?: number
          title: string
          updated_at?: string
          user: string
        }
        Update: {
          complete?: boolean
          created_at?: string
          description?: string | null
          duration?: Database["public"]["Enums"]["goal_duration"]
          growth_framework?: number
          id?: number
          title?: string
          updated_at?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_growth_framework_fkey"
            columns: ["growth_framework"]
            isOneToOne: false
            referencedRelation: "growth_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_frameworks: {
        Row: {
          created_at: string
          focus_areas: string[] | null
          id: number
          one_liner: string | null
          role_name: string
          role_start: string
          role_target: string | null
          role_target_date: string | null
          strengths: string[] | null
          updated_at: string
          user: string
        }
        Insert: {
          created_at?: string
          focus_areas?: string[] | null
          id?: number
          one_liner?: string | null
          role_name: string
          role_start: string
          role_target?: string | null
          role_target_date?: string | null
          strengths?: string[] | null
          updated_at?: string
          user: string
        }
        Update: {
          created_at?: string
          focus_areas?: string[] | null
          id?: number
          one_liner?: string | null
          role_name?: string
          role_start?: string
          role_target?: string | null
          role_target_date?: string | null
          strengths?: string[] | null
          updated_at?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "growth_frameworks_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          preferred_name: string | null
          role: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          preferred_name?: string | null
          role?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          preferred_name?: string | null
          role?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      self_evals: {
        Row: {
          created_at: string
          growth_framework: number
          id: number
          notes: string | null
          rating: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          growth_framework: number
          id?: number
          notes?: string | null
          rating: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          growth_framework?: number
          id?: number
          notes?: string | null
          rating?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "self_evals_growth_framework_fkey"
            columns: ["growth_framework"]
            isOneToOne: false
            referencedRelation: "growth_frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
      traits: {
        Row: {
          archived: boolean
          created_at: string
          description: string | null
          growth_framework: number
          id: number
          title: string
          trait: Database["public"]["Enums"]["trait"]
          updated_at: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          description?: string | null
          growth_framework: number
          id?: number
          title: string
          trait: Database["public"]["Enums"]["trait"]
          updated_at?: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          description?: string | null
          growth_framework?: number
          id?: number
          title?: string
          trait?: Database["public"]["Enums"]["trait"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "traits_growth_framework_fkey"
            columns: ["growth_framework"]
            isOneToOne: false
            referencedRelation: "growth_frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      goal_duration: "short" | "medium" | "long"
      trait: "strength" | "focus_area"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
