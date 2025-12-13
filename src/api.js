import { supabase } from "./supabaseClient";

export const registerUser = async ({ username, email, password }) => {
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle(); 

  if (existingProfile) {
    throw new Error("Username already taken.");
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }
    
  return { 
    user: data.user, 
    username: username 
  };
};

export const loginUser = async ({ email, password }) => {
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw new Error(signInError.message);
  }

  if (!data.user) {
    throw new Error("Login failed: User object is missing.");
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return { 
      user: data.user, 
      username: data.user.email 
    };
  }

  return { 
    user: data.user, 
    username: profile.username 
  };
};